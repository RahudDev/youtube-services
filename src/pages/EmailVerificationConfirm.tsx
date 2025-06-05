import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../App';

const EmailVerificationConfirm = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    const isAffiliate = searchParams.get('affiliate') === 'true';

    if (token) {
      verifyToken(token, isAffiliate);
    } else {
      setError('Invalid verification link.');
    }
  }, [searchParams]);

  const verifyToken = async (token: string, isAffiliate: boolean) => {
    try {
      const response = await axios.get(`${API}/api/auth/verify-email?token=${token}`);
      setMessage(response.data.message);

      setTimeout(() => {
        if (isAffiliate) {
          navigate('/affiliate/pending-application');
        } else {
          navigate('/dashboard');
        }
      }, 3000); // Redirect after 3 seconds
    } catch (err: any) {
      setError(err.response?.data?.error || 'Verification failed.');
    }
  };

  return (
    <div className="container mt-5 text-center" style={{ maxWidth: '500px' }}>
      <h2>Email Verification</h2>
      {message && <div className="alert alert-success mt-4">{message}</div>}
      {error && <div className="alert alert-danger mt-4">{error}</div>}
      {message && <p>Redirecting to your dashboard...</p>}
    </div>
  );
};

export default EmailVerificationConfirm;
