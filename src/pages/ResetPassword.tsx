import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../App';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; 

const ResetPassword = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [validToken, setValidToken] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get('token');
    setToken(tokenParam || '');

    if (tokenParam) {
      axios.get(`${API}/api/auth/reset-password?token=${tokenParam}`)
        .then(res => {
          if (res.data.success) {
            setValidToken(true);
          } else {
            setError('Reset link has expired or is invalid.');
          }
        })
        .catch(() => setError('Invalid reset link.'));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      return setError('Password must be at least 6 characters long.');
    }

    if (password !== confirmPassword) {
      return setError('Passwords do not match.');
    }

    try {
      const res = await axios.post(`${API}/api/auth/reset-password`, { token, password });
      setMessage(res.data.message);
      setError('');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error resetting password.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3>Reset Password</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}
      {validToken && (
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3 position-relative">
            <label>New Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <span
              className="position-absolute top-50 end-0 translate-middle-y pe-3"
                style={{ cursor: 'pointer', zIndex: 10 }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <div className="form-group mb-3 position-relative">
            <label>Confirm Password</label>
            <input
              type={showConfirm ? 'text' : 'password'}
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
            <span
              className="position-absolute top-50 end-0 translate-middle-y pe-3"
              style={{ cursor: 'pointer' }}
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <button type="submit" className="btn btn-primary w-100">Reset Password</button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
