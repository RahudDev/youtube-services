import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../App';

const VerifyEmail = () => {
  const [seconds, setSeconds] = useState(10);
  const [isResendEnabled, setIsResendEnabled] = useState(false);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setIsResendEnabled(true);
    }
  }, [seconds]);

  const handleResendVerification = async () => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const email = userData.email;
    if (!email) {
      console.error('Email not found in localStorage');
      return;
    }

    try {
      await axios.post(`${API}/api/auth/resend-verifyemail`, { email });
      setSeconds(10);
      setIsResendEnabled(false);
    } catch (error) {
      console.error('Error sending verification email:', error);
    }
  };

  return (
    <div className="container mt-5 text-center" style={{ maxWidth: '500px' }}>
      <h2>Verify Your Email</h2>
      <p className="mt-3">
        Thank you for signing up! We’ve sent a verification link to your email.
        Please check your inbox and follow the instructions to activate your account.
      </p>
      <p>If you didn’t receive the email, check your spam or junk folder.</p>

      {isResendEnabled ? (
        <button
          className="btn btn-primary mt-4"
          onClick={handleResendVerification}
        >
          Resend Verification Email
        </button>
      ) : (
        <p className="mt-4">
          Please wait {seconds} seconds before resending the email.
        </p>
      )}
    </div>
  );
};

export default VerifyEmail;
