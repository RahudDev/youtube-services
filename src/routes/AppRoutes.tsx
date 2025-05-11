import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Services from '../pages/Services';
import Login from '../pages/Login';
import YoutubeSuccess from '../pages/checkoutsuccess';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/login" element={<Login />} />
      <Route path="/completed" element={<YoutubeSuccess />} />
    </Routes>
  );
};

export default AppRoutes;
