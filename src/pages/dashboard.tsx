import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user') || '{}');

  const user = {
    name: userData.name,
    email: userData.email,
    username: userData.username,
  };

  useEffect(() => {
    if (!user.name || !user.email || !user.username) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="container mt-5">
      {/* Navigation Bar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Dashboard</h2>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Main Card */}
      <div className="card shadow-lg border-0 rounded-4 p-4 animate__animated animate__fadeIn">
        <h2 className="text-center mb-4">Welcome to Your Dashboard</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card bg-primary text-white h-100 rounded-4 p-3 shadow">
              <h5>Your Name</h5>
              <p className="fs-5 fw-bold">{user.name}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-success text-white h-100 rounded-4 p-3 shadow">
              <h5>Your Email</h5>
              <p className="fs-5 fw-bold">{user.email}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-info text-white h-100 rounded-4 p-3 shadow">
              <h5>Username Channel</h5>
              <p className="fs-5 fw-bold">{user.username}</p>
            </div>
          </div>
        </div>

        <div className="mt-5 text-center">
          <Link to="/services" className="btn btn-dark btn-lg animate-drop delay-2s shadow">
            Explore Services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
