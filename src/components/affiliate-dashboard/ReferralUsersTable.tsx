import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../../App';

const USERS_PER_PAGE = 20;

const ReferralsTable: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        const userEmail = userData.email;

        if (!userEmail) {
          console.warn('No user email found');
          setLoading(false);
          return;
        }

        const response = await fetch(`${API}/api/affiliate/referrals?email=${userEmail}`);

        if (response.ok) {
          const data = await response.json();
          setUsers(data); // Directly use API response
        } else if (response.status === 404) {
          setUsers([]);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

 const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Show minutes if joined within the last hour
  if (diffHours === 0) {
    if (diffMinutes === 0) return 'Just now';
    return diffMinutes === 1 ? '1 minute ago' : `${diffMinutes} minutes ago`;
  }

  // Show hours if joined within the last 24 hours
  if (diffHours < 24) {
    return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
  }
  
  // Show days for 1-29 days
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 30) return `${diffDays} days ago`;
  
  // Show months for 1-11 months
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return months === 1 ? '1 month ago' : `${months} months ago`;
  }
  
  // Show years for 1+ years
  const years = Math.floor(diffDays / 365);
  return years === 1 ? '1 year ago' : `${years} years ago`;
};



  const renderCountryWithFlag = (flagUrl: string, countryCode: string) => {
    // Check if flagUrl is a valid URL
    if (flagUrl && flagUrl.startsWith('http')) {
      return (
        <div className="d-flex align-items-center justify-content-center">
          <img 
            src={flagUrl} 
            alt={`${countryCode} flag`}
            style={{ width: '24px', height: '16px', marginRight: '8px' }}
            onError={(e) => {
              // Fallback if image fails to load
              e.currentTarget.style.display = 'none';
            }}
          />
          <span>{countryCode}</span>
        </div>
      );
    }
    
    // Fallback for non-URL flag data
    return `${flagUrl} ${countryCode}`;
  };

  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);

  const paginatedUsers = users.slice(
    currentPage * USERS_PER_PAGE,
    (currentPage + 1) * USERS_PER_PAGE
  );

  const handleClick = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="fw-bold mb-4 text-center">Referred Users</h2>

        {loading ? (
          <div className="text-center">Loading referred users...</div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="table table-bordered table-hover text-center">
                <thead className="table-light">
                  <tr>
                    <th className="bg-secondary">Name</th>
                    <th className="bg-secondary">Total Profited</th>
                    <th className="bg-secondary">Status</th>
                    <th className="bg-secondary">Country</th>
                    <th className="bg-secondary">Date Since Join</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.length > 0 ? (
                    paginatedUsers.map((user, index) => (
                      <tr key={index}>
                        <td>{user.name}</td>
                        <td className='text-success'>
                        <strong>${user.totalProfited}</strong>
                             </td>
                        <td>
                          <span
                            className={`badge bg-${user.isVerified ? 'success' : 'warning'}`}
                          >
                            {user.isVerified ? 'Verified' : 'Unverified'}
                          </span>
                        </td>
                        <td>{renderCountryWithFlag(user.flag, user.country)}</td>
                        <td>{formatDate(user.createdAt)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5}>No referred users found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="d-flex justify-content-center align-items-center mt-3">
                <button
                  className="btn btn-outline-primary me-2"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 0}
                >
                  ← Prev
                </button>
                <span className="px-3">
                  Page {currentPage + 1} of {totalPages}
                </span>
                <button
                  className="btn btn-outline-primary ms-2"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages - 1}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}

        <div className="text-center mt-4">
          <Link
            to="/affiliate-dashboard/terms"
            onClick={handleClick('/affiliate-dashboard/terms')}
            className="text-decoration-none me-3"
          >
            Affiliate Terms & Conditions
          </Link>
          <Link
            to="/affiliate-dashboard/privacy"
            onClick={handleClick('/affiliate-dashboard/privacy')}
            className="text-decoration-none"
          >
            Affiliate Privacy Policy
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ReferralsTable;