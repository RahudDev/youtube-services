import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API } from "../App";



const Services = () => {
  const services = [
    {
      id: 'YT_001',
      name: 'YouTube Subscribers',
      price: '$10 / 1000 subs',
      image: 'https://img.icons8.com/color/96/youtube-play.png',
    },
    {
      id: 'YT_002',
      name: 'Watch Hours',
      price: '$24 / 1000 hours',
      image: 'https://img.icons8.com/color/96/time.png',
    },
    {
      id: 'YT_003',
      name: 'Video Likes',
      price: '$5 / 100 likes',
      image: 'https://img.icons8.com/color/96/facebook-like.png',
    },
    {
      id: 'YT_004',
      name: 'Channel SEO Boost',
      price: '$30',
      image: 'https://od.lk/s/NjFfOTMzNDU5MDRf/Untitled%20design%20%284%29-Photoroom.png',
    },
  ];

  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [warning, setWarning] = useState<string>('');

  const handleQuantityChange = (id: string, increment: boolean) => {
  setQuantities((prev) => {
    const current = prev[id] ?? 0;
    const newQuantity = Math.max(0, Math.min(100, current + (increment ? 1 : -1)));
    return {
      ...prev,
      [id]: newQuantity,
    };
  });
  setWarning('');
};

const handleInputChange = (id: string, value: string) => {
  if (value === '') {
    setQuantities((prev) => ({
      ...prev,
      [id]: 0, // Set to 0 instead of empty or 1
    }));
    setWarning('');
    return;
  }

  const parsedValue = parseInt(value, 10);
  if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 100) {
    setQuantities((prev) => ({
      ...prev,
      [id]: parsedValue,
    }));

    if (parsedValue === 0) {
      setWarning('Quantity must be between 1 and 100');
    } else {
      setWarning('');
    }
  } else {
    setWarning('Quantity must be between 1 and 100');
  }
};


  const handleCheckout = async (service: any) => {
    const quantity = quantities[service.id];

   if (quantity <= 0 && quantity > 100) {
    setWarning('Quantity must be between 1 and 100');
    return;
   }


    const cart = [{ id: service.id, quantity }];
    try {
      const response = await fetch(`${API}/api/paypal/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart }),
      });

      if (!response.ok) throw new Error('Failed to create order');

      const { id } = await response.json();
      window.location.href = `https://www.paypal.com/checkoutnow?token=${id}`;
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

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
                <p className="card-text text-muted mb-2">{service.price}</p>
                <div className="mb-3 d-flex align-items-center justify-content-center">
                  <label htmlFor={`qty-${service.id}`} className="me-2 mb-0 fw-medium">Qty:</label>
                  <button
                    className="btn btn-outline-secondary me-2"
                    onClick={() => handleQuantityChange(service.id, false)}
                  >
                    -
                  </button>
                  <input
                    id={`qty-${service.id}`}
                    type="text"
                    value={quantities[service.id]?.toString() ?? '0'}
                     onChange={(e) => handleInputChange(service.id, e.target.value.replace(/^0+(?=\d)/, ''))}
                    className="form-control text-center me-2"
                    style={{ width: '80px' }}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => handleQuantityChange(service.id, true)}
                  >
                    +
                  </button>
                </div>
                {warning && (
                  <div className="alert alert-warning text-center">{warning}</div>
                )}
                <button
                  className="btn btn-outline-success rounded-pill px-4"
                  onClick={() => handleCheckout(service)}
                >
                  Checkout Now
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
