// src/pages/Services.tsx
import React from 'react';

const Services = () => {
  const services = [
    { id: 1, name: 'YouTube Subscribers', price: '$10 / 100 subs' },
    { id: 2, name: 'Watch Hours', price: '$20 / 1000 hours' },
    { id: 3, name: 'Video Likes', price: '$5 / 100 likes' },
    { id: 4, name: 'Channel SEO Boost', price: '$30' },
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Our Services</h2>
      <div className="row">
        {services.map((service) => (
          <div className="col-md-4 mb-4" key={service.id}>
            <div className="card h-100">
              <div className="card-body text-center">
                <h5 className="card-title">{service.name}</h5>
                <p className="card-text">{service.price}</p>
                <button className="btn btn-success">Order Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
