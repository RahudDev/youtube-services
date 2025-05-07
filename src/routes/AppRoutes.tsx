import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Services from '../pages/Services';
import Login from '../pages/Login';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Landing page stays at root */}
      <Route path="/" element={<Home />} />

      {/* Other pages under /m/ prefix */}
      <Route path="/m/services" element={<Services />} />
      <Route path="/m/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
