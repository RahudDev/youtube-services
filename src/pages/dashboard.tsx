import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { API } from '../App';

const Dashboard = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user') || '{}');

  const [user, setUser] = useState({
    name: userData.name,
    email: userData.email,
    username: userData.username,
  });

  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!user.name || !user.email) {
      navigate('/login');
    }
  }, [user.name, user.email, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleEditUsername = () => {
    setIsEditingUsername(true);
    setNewUsername(user.username || '');
    setError('');
    setSuccess('');
  };

  const handleCancelEdit = () => {
    setIsEditingUsername(false);
    setNewUsername('');
    setError('');
    setSuccess('');
  };

  const validateAndUpdateUsername = async () => {
    // Basic validation
    if (!newUsername.trim()) {
      setError('Username cannot be empty');
      return;
    }

    if (!newUsername.startsWith('@')) {
      setError("Username must start with '@'");
      return;
    }

    if (newUsername === user.username) {
      setError('New username is the same as current username');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // First, check if username exists on YouTube
      const youtubeCheck = await axios.post(`${API}/api/youtube/check-youtube-username`, {
        username: newUsername
      });

      if (!youtubeCheck.data.exists) {
        setError('YouTube channel with this username not found.');
        setIsLoading(false);
        return;
      }

      // Then check if username is already taken in database
      const response = await axios.post(`${API}/api/youtube/update-username`, {
        email: user.email,
        newUsername: newUsername
      });

      if (response.data.success) {
        // Update local state and localStorage
        const updatedUser = { ...user, username: newUsername };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        setSuccess('Username updated successfully!');
        setIsEditingUsername(false);
        
        // Reload page after a short delay to show success message
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || 'Failed to update username. Please try again.';
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      {/* Navigation Bar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Dashboard</h2>
        <div className="d-flex align-items-center gap-2">
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => navigate('/deletion')}
            style={{ opacity: 0.6 }}
          >
            Close Account
          </button>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Success/Error Messages */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError('')}></button>
        </div>
      )}
      {success && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {success}
          <button type="button" className="btn-close" onClick={() => setSuccess('')}></button>
        </div>
      )}

      {/* Main Card */}
      <div className="card shadow-lg border-0 rounded-4 p-4 animate__animated animate__fadeIn">
        <h2 className="text-center mb-4">Welcome to My Dashboard</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card bg-primary text-white h-100 rounded-4 p-3 shadow">
              <h5>Name</h5>
              <p className="fs-5 fw-bold">{user.name}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-success text-white h-100 rounded-4 p-3 shadow">
              <h5>Email</h5>
              <p className="fs-5 fw-bold">{user.email}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-info text-white h-100 rounded-4 p-3 shadow position-relative">
              <div className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                  <h5>Username Channel</h5>
                  {!isEditingUsername ? (
                    <div className="d-flex align-items-center justify-content-between">
                      <p className="fs-5 fw-bold mb-0">{user.username || 'Not set'}</p>
                      <button
                        className="btn btn-sm btn-light text-info ms-2"
                        onClick={handleEditUsername}
                        title="Edit Username"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                    </div>
                  ) : (
                    <div className="mt-2">
                      <div className="input-group input-group-sm mb-2">
                        <input
                          type="text"
                          className="form-control"
                          value={newUsername}
                          onChange={(e) => setNewUsername(e.target.value)}
                          placeholder="@example"
                          disabled={isLoading}
                        />
                      </div>
                      <div className="d-flex gap-1">
                        <button
                          className="btn btn-sm btn-light"
                          onClick={validateAndUpdateUsername}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-1" role="status"></span>
                              Validating...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-check me-1"></i>
                              Save
                            </>
                          )}
                        </button>
                        <button
                          className="btn btn-sm btn-outline-light"
                          onClick={handleCancelEdit}
                          disabled={isLoading}
                        >
                          <i className="bi bi-x"></i>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 text-center">
          <Link to="/services" className="btn btn-dark btn-lg animate-drop delay-2s shadow me-3">
            Explore Services
          </Link>
          <Link to="/channel-info" className="btn btn-dark btn-lg animate-drop delay-2s shadow">
            My Channel Insight
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;