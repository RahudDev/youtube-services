import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../App';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Function to check if the username exists on YouTube
  const checkUsernameExists = async () => {
    try {
      const response = await axios.post(`${API}/api/youtube/check-youtube-username`, { username });
      return response.data.exists; // Assuming the backend returns { exists: true/false }
    } catch (err) {
      setError('Failed to verify username. Please try again.');
      return false;
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.startsWith('@')) {
      setError("Username must start with '@'");
      return;
    }

     if (password.length < 6) {
      return setError('Password must be at least 6 characters long.');
    }

    // Step 1: Check if the username exists on YouTube
    const usernameExists = await checkUsernameExists();

    if (!usernameExists) {
      setError('YouTube channel with this username not found.');
      return;
    }

    try {
      setError('');
      setSuccess('');

      const response = await axios.post(`${API}/api/auth/signup`, {
        username,
        name,
        email,
        password,
      });

      setSuccess(response.data.message);

      localStorage.setItem('name', name);
      localStorage.setItem('username', username);
      localStorage.setItem('email', email);

      setUsername('');
      setName('');
      setEmail('');
      setPassword('');

      navigate('/verifyemail');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="text-center">Sign Up</h2>
      <form onSubmit={handleSignUp}>
        {error && (
          <div className="alert alert-danger py-2" role="alert">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success py-2" role="alert">
            {success}
          </div>
        )}

        <div className="form-group mb-3">
          <label>Username Channel</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="@example"
          />
        </div>

        <div className="form-group mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-4">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Sign Up
        </button>

        <p className="text-center mt-3">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
