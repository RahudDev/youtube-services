import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Services from '../pages/Services';
import Login from '../pages/Login';
import YoutubeSuccess from '../pages/checkoutsuccess';
import SignUp from '../pages/signup';
import VerifyEmail from '../pages/VerifyEmail';
import EmailVerificationConfirm from '../pages/EmailVerificationConfirm';
import Dashboard from '../pages/dashboard';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import AuthGuard from './authsecurity';
import Channeldata from '../pages/ChannelInfo';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={ <AuthGuard redirectIfVerified="/dashboard" redirectIfNotVerified=""><Home /></AuthGuard>} />
      <Route path="/services" element={<Services />} />
      <Route path="/login" element={<AuthGuard redirectIfVerified="/dashboard" redirectIfNotVerified=""> <Login /> </AuthGuard>} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/completed" element={<YoutubeSuccess />} />
      <Route path="/signup" element={<AuthGuard redirectIfVerified="/dashboard" redirectIfNotVerified=""> <SignUp /> </AuthGuard>} />
      <Route path="/verifyemail" element={<VerifyEmail />} />
      <Route path="/confirm-email" element={<EmailVerificationConfirm />} />
      <Route path="/dashboard" element={<AuthGuard redirectIfVerified="" redirectIfNotVerified="/login"> <Dashboard /> </AuthGuard> } />
      <Route path="/channel-info" element={<AuthGuard redirectIfVerified="" redirectIfNotVerified="/login"> <Channeldata /> </AuthGuard> } />               
    </Routes>
  );
};

export default AppRoutes;
