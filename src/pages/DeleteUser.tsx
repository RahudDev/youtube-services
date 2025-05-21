import React, { useEffect, useState } from 'react';
import { API } from '../App';

const DeleteAccount: React.FC = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState('');
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const storedEmail = userData.email;
    setEmail(storedEmail);
  }, []);

  const handleFinalDelete = async () => {
    if (!email) {
      setStatus('Email not found in localStorage.');
      return;
    }

    if (confirmEmail !== email) {
      setStatus('Email confirmation does not match.');
      return;
    }

    if (!agreed) {
      setStatus('Please confirm your decision by checking the box.');
      return;
    }

    try {
      const response = await fetch(`${API}/api/auth/delete-user`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus(result.message || 'Account deleted successfully.');
        localStorage.clear();
        window.location.reload();
      } else {
        setStatus(result.error || result.message || 'Deletion failed.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setStatus('An error occurred while deleting the account.');
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', textAlign: 'center' }}>
      <h2>Delete My Account</h2>
      <p>
        {email ? `Account email: ${email}` : 'No email found in localStorage.'}
      </p>

      <button
        onClick={() => setShowConfirm(true)}
        style={{
          backgroundColor: 'red',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          cursor: 'pointer',
          borderRadius: 5,
          marginTop: 10,
        }}
        disabled={!email}
      >
        Delete My Account
      </button>

      {showConfirm && (
        <div style={{ marginTop: 30, padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
          <h4>Confirm Deletion</h4>
          <p>Please retype your email <strong>"{email}"</strong> to confirm:</p>
          <input
            type="email"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            placeholder="Retype your email"
            style={{ padding: 8, width: '100%', marginBottom: 10 }}
          />
          <div style={{ marginBottom: 10 }}>
            <label>
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />{' '}
              I understand this action is permanent and cannot be undone.
            </label>
          </div>
          <button
            onClick={handleFinalDelete}
            style={{
              backgroundColor: 'darkred',
              color: 'white',
              padding: '8px 16px',
              border: 'none',
              borderRadius: 5,
              cursor: 'pointer',
              marginRight: 10,
            }}
          >
            Confirm Delete
          </button>
          <button
            onClick={() => setShowConfirm(false)}
            style={{
              backgroundColor: 'gray',
              color: 'white',
              padding: '8px 16px',
              border: 'none',
              borderRadius: 5,
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </div>
      )}

      {status && (
        <p style={{ marginTop: 20, color: status.includes('successfully') ? 'green' : 'red' }}>
          {status}
        </p>
      )}
    </div>
  );
};

export default DeleteAccount;
