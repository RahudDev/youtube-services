// src/components/AuthGuard.tsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../App';

interface AuthGuardProps {
  children?: React.ReactNode;
  redirectIfVerified?: string;
  redirectIfNotVerified?: string;
}

const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  redirectIfVerified,
  redirectIfNotVerified,
}) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const checkVerification = async () => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const useremail = userData.email;

    if (!useremail) {
      setAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`${API}/api/auth/check-verification?email=${useremail}`);
      setAuthenticated(res.data.verified);
    } catch (err) {
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  checkVerification();
}, []);


  if (loading) return <p>Loading...</p>;

  if (authenticated && redirectIfVerified) {
    return <Navigate to={redirectIfVerified} />;
  }

  if (!authenticated && redirectIfNotVerified) {
    return <Navigate to={redirectIfNotVerified} />;
  }

  return <>{children}</>;
};

export default AuthGuard;
