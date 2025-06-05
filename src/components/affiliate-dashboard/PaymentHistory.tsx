import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../../App';
import { useNavigate } from 'react-router-dom';

interface HistoryEntry {
  orderId: string;
  wallet_method: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

const PaymentHistory: React.FC = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<HistoryEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const userData = localStorage.getItem('user');
  const userEmail = userData ? JSON.parse(userData).email : null;

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.post<{ history: HistoryEntry[] }>(
          `${API}/api/affiliate/payout-history`,
          { email: userEmail }
        );
        const data = response.data.history || [];
        setHistory(data);
        setFilteredHistory(data);
      } catch (err) {
        console.error('Error loading payout history:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchHistory();
    } else {
      setLoading(false);
    }
  }, [userEmail]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const term = value.toLowerCase();
    const filtered = history.filter((entry) =>
      entry.orderId.toLowerCase().includes(term) ||
      entry.wallet_method.toLowerCase().includes(term) ||
      entry.status.toLowerCase().includes(term) ||
      entry.amount.toString().includes(term)
    );
    setFilteredHistory(filtered);
  };

  const handleBackToDashboard = () => {
    navigate('/affiliate-dashboard');
  };

  return (
    <div className="container py-5">
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <button
          className="btn btn-link text-decoration-none fw-bold"
          onClick={handleBackToDashboard}
        >
          ← Back to Dashboard
        </button>
      </div>

      <h3 className="fw-bold mb-4 text-center">Payout History</h3>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Order ID, Method, Status or Amount..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" />
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-bordered">
            <thead className="table-primary text-center align-middle">
              <tr>
                <th>Order ID</th>
                <th>Method</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-muted py-4">
                    No matching payout history found.
                  </td>
                </tr>
              ) : (
                filteredHistory.map((entry, i) => (
                  <tr key={i}>
                    <td>{entry.orderId}</td>
                    <td>{entry.wallet_method}</td>
                    <td>${entry.amount.toFixed(2)}</td>
                    <td>
                      <span
                        className={`badge px-3 py-2 rounded-pill ${
                          entry.status === 'pending'
                            ? 'bg-warning text-dark'
                            : entry.status === 'approved'
                            ? 'bg-success'
                            : 'bg-danger'
                        }`}
                      >
                        {entry.status}
                      </span>
                    </td>
                    <td>{new Date(entry.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
