import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../App';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  

 const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  try {
    // Get user IP geolocation
    const geo = await fetch('https://ipapi.co/json').then(res => res.json());

    const country = geo.country || '';
    const flag = `https://flagcdn.com/w40/${country.toLowerCase()}.png`;

    const response = await axios.post(`${API}/api/auth/login`, {
      email,
      password,
      country,
      flag
    });

    const user = response.data.user;

    if (!user.email || !user.uuid || !user.isVerified) {
      setError("Your account is not verified or missing required information.");
      return;
    }

    const safeUser: {
      name: string;
      email: string;
      username: string;
      affiliate?: boolean;
    } = {
      name: user.name,
      email: user.email,
      username: user.username,
    };

    // ✅ Only store affiliateData and affiliate flag if affiliator is true
    if (user.affiliateData?.affiliator === true) {
      safeUser.affiliate = true;
    }

    localStorage.setItem('user', JSON.stringify(safeUser));
    localStorage.removeItem('referredBy');
    window.location.reload();
  } catch (err: any) {
    const errorMsg = err.response?.data?.error || 'Login failed. Please try again.';
    const isAffiliate = err.response?.data?.affiliate;

    // ✅ Redirect based on affiliate status if not verified
    if (
      errorMsg.includes('not yet verified') ||
      errorMsg.includes('not verified')
    ) {
      if (isAffiliate) {
        navigate('/verifyemail?affiliate=true');
      } else {
        navigate('/verifyemail');
      }
      return;
    }

    setError(errorMsg);
  }
};



  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="text-center">Login</h2>
      <form onSubmit={handleLogin}>
        {error && (
          <div className="alert alert-danger py-2" role="alert">
            {error}
          </div>
        )}

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
          Login
        </button>

         <p className="text-center mt-3">
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>

        <p className="text-center mt-3">
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
