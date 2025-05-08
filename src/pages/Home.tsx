// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Custom styles for animation

const Home = () => {
  return (
    <div className="home-gradient">
      {/* Hero Section */}
      <div className="container text-center py-5">
        <h1 className="display-3 fw-bold mb-3 animate-drop">Boost Your YouTube Channel 🚀</h1>
        <p className="lead mb-4 animate-drop delay-1s">
          Get real subscribers, watch hours, likes & more — 100% safe and fast delivery.
        </p>
        <Link to="/services" className="btn btn-light btn-lg animate-drop delay-2s shadow">
          Explore Services
        </Link>
      </div>

      {/* Features Section */}
      <div className="container mt-5">
        <h2 className="text-center mb-4 fw-semibold animate-drop delay-3s">Why Choose Us?</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-success animate-drop delay-4s">✅ Real & Safe Growth</h5>
                <p className="card-text animate-drop delay-5s">We provide real engagement with organic reach.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-primary animate-drop delay-6s">⚡ Fast Delivery</h5>
                <p className="card-text animate-drop delay-7s">Get your services delivered within hours.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-warning animate-drop delay-8s">💰 Affordable Prices</h5>
                <p className="card-text animate-drop delay-9s">Top-quality services at budget-friendly rates.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center py-5 mt-5 bg-dark text-white">
        <h2 className="mb-3 animate-drop delay-10s">Ready to boost your YouTube channel?</h2>
        <Link to="/services" className="btn btn-outline-light btn-lg shadow animate-drop delay-11s">
          View Our Services
        </Link>
      </div>
    </div>
  );
};

export default Home;
