import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../App';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [flagUrl, setFlagUrl] = useState('');
  const navigate = useNavigate();

  // ✅ Get user country code from IP
  useEffect(() => {
    const getCountry = async () => {
      try {
        const res = await axios.get('https://ipapi.co/json/');
         const code = res.data.country_code;
          setCountryCode(code);
        setFlagUrl(`https://flagcdn.com/w80/${code.toLowerCase()}.png`);
      } catch (err) {
        console.error('Failed to get country info');
      }
    };
    getCountry();
  }, []);

  const checkUsernameExists = async () => {
    try {
      const response = await axios.post(`${API}/api/youtube/check-youtube-username`, { username });
      return response.data.exists;
    } catch (err) {
      setError('Failed to verify username. Please try again.');
      return false;
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.startsWith('@')) {
      return setError("Username must start with '@'");
    }

    if (password.length < 6) {
      return setError('Password must be at least 6 characters long.');
    }

    const usernameExists = await checkUsernameExists();
    if (!usernameExists) {
      return setError('YouTube channel with this username not found.');
    }

    try {
      setError('');
      setSuccess('');

      const response = await axios.post(`${API}/api/auth/signup`, {
        username,
        name,
        email,
        password,
        country: countryCode, // ✅ Include country
        flag: flagUrl, 
      });

      setSuccess(response.data.message);

      const safeUser = { name, email, username, country: countryCode };
      localStorage.setItem('user', JSON.stringify(safeUser));

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
        {error && <div className="alert alert-danger py-2">{error}</div>}
        {success && <div className="alert alert-success py-2">{success}</div>}

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
