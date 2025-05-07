// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Custom styles for animation

const Home = () => {
  return (
    <div className="home-gradient text-white">
      {/* Hero Section */}
      <div className="container text-center py-5">
        <h1 className="display-3 fw-bold mb-3 animate-fade-in">Grow Your YouTube Channel 🚀</h1>
        <p className="lead mb-4 animate-fade-in delay-1s">
          Get real subscribers, watch hours, likes & more — 100% safe and fast delivery.
        </p>
        <Link to="/services" className="btn btn-light btn-lg animate-fade-in delay-2s shadow">
          Explore Services
        </Link>
      </div>

      {/* Features Section */}
      <div className="container mt-5">
        <h2 className="text-center mb-4 fw-semibold text-white">Why Choose Us?</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-success">✅ Real & Safe Growth</h5>
                <p className="card-text">We provide real engagement with organic reach.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-primary">⚡ Fast Delivery</h5>
                <p className="card-text">Get your services delivered within hours.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-warning">💰 Affordable Prices</h5>
                <p className="card-text">Top-quality services at budget-friendly rates.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center py-5 mt-5 bg-dark text-white">
        <h2 className="mb-3">Ready to boost your YouTube channel?</h2>
        <Link to="/services" className="btn btn-outline-light btn-lg shadow">
          View Our Services
        </Link>
      </div>
    </div>
  );
};

export default Home;
