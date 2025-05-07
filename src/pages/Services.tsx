// src/pages/Services.tsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Services = () => {
  const services = [
    {
      id: 1,
      name: 'YouTube Subscribers',
      price: '$10 / 1000 subs',
      image: 'https://img.icons8.com/color/96/youtube-play.png',
    },
    {
      id: 2,
      name: 'Watch Hours',
      price: '$24 / 1000 hours',
      image: 'https://img.icons8.com/color/96/time.png',
    },
    {
      id: 3,
      name: 'Video Likes',
      price: '$5 / 100 likes',
      image: 'https://img.icons8.com/color/96/facebook-like.png',
    },
    {
      id: 4,
      name: 'Channel SEO Boost',
      price: '$30',
      image: 'https://od.lk/s/NjFfOTMzNDU5MDRf/Untitled%20design%20%284%29-Photoroom.png',
    },
  ];

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold">Our YouTube Services</h2>
      <div className="row justify-content-center">
        {services.map((service) => (
          <div className="col-md-6 col-lg-3 mb-4" key={service.id}>
            <div className="card shadow-sm h-100 border-0 hover-shadow transition rounded-4">
              <img
                src={service.image}
                alt={service.name}
                className="card-img-top p-4"
                style={{ height: '150px', objectFit: 'contain' }}
              />
              <div className="card-body text-center">
                <h5 className="card-title fw-semibold">{service.name}</h5>
                <p className="card-text text-muted mb-3">{service.price}</p>
                <button className="btn btn-outline-success rounded-pill px-4">
                  Order Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .hover-shadow:hover {
          transform: scale(1.03);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        }
        .transition {
          transition: all 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Services;
