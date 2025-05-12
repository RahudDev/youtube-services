import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Services from '../pages/Services';
import Login from '../pages/Login';
import YoutubeSuccess from '../pages/checkoutsuccess';
import SignUp from '../pages/signup';
import VerifyEmail from '../pages/VerifyEmail';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/login" element={<Login />} />
      <Route path="/completed" element={<YoutubeSuccess />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verifyemail" element={<VerifyEmail />} />
    </Routes>
  );
};

export default AppRoutes;
