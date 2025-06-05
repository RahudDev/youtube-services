// src/components/AffiliateGuard.tsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../App';

interface AffiliateGuardProps {
  children?: React.ReactNode;
  redirectIfAffiliator?: string;
  redirectIfNotAffiliator?: string;
}

const AffiliateGuard: React.FC<AffiliateGuardProps> = ({
  children,
  redirectIfAffiliator,
  redirectIfNotAffiliator,
}) => {
  const [isAffiliator, setIsAffiliator] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const userEmail = userData.email;

    if (!userEmail) {
      setIsAffiliator(false);
      setLoading(false);
      return;
    }

    axios
      .get(`${API}/api/affiliate/check-affiliator/${userEmail}`)
      .then((res) => {
        setIsAffiliator(res.data?.affiliateData?.affiliator === true);
        setLoading(false);
      })
      .catch(() => {
        setIsAffiliator(false);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  if (isAffiliator && redirectIfAffiliator) {
    return <Navigate to={redirectIfAffiliator} />;
  }

  if (!isAffiliator && redirectIfNotAffiliator) {
    return <Navigate to={redirectIfNotAffiliator} />;
  }

  return <>{children}</>;
};

export default AffiliateGuard;
