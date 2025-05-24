import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API } from "../App";



const Services = () => {
  const services = [
    {
      id: 'YT_001',
      name: 'YouTube Subscribers',
      price: '$1 / 100 subs',
      image: '/assets/subs.png',
    },
    {
      id: 'YT_002',
      name: 'Watch Hours',
      price: '$24 / 1000 hours',
      image: '/assets/watch-times.png',
    },
    {
      id: 'YT_003',
      name: 'Video Views',
      price: '$15 / 1000 views',
      image: '/assets/views.png',
    },
     {
      id: 'YT_004',
      name: 'Short Video Views',
      price: '$3 / 1000 short views',
      image: '/assets/short.png',
    },
     {
      id: 'YT_005',
      name: 'Video Likes',
      price: '$4 / 1000 likes',
      image: '/assets/likes.png',
    },
    {
      id: 'YT_006',
      name: 'Channel SEO Boost',
      price: '$10 / 1 video',
      image: '/assets/yt-seo.png',
    },
  ];

  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [warning, setWarning] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleQuantityChange = (id: string, increment: boolean) => {
    setQuantities((prev) => {
      const current = prev[id] ?? 0;
      const newQuantity = Math.max(0, Math.min(100, current + (increment ? 1 : -1)));
      return { ...prev, [id]: newQuantity };
    });
    setWarning('');
  };

  const handleInputChange = (id: string, value: string) => {
    if (value === '') {
      setQuantities((prev) => ({ ...prev, [id]: 0 }));
      setWarning('');
      return;
    }

    const parsed = parseInt(value, 10);
    if (!isNaN(parsed) && parsed >= 0 && parsed <= 100) {
      setQuantities((prev) => ({ ...prev, [id]: parsed }));
      setWarning(parsed === 0 ? 'Quantity must be between 1 and 100' : '');
    } else {
      setWarning('Quantity must be between 1 and 100');
    }
  };

  const handleCheckout = async (service: any) => {
    const quantity = quantities[service.id];

    if (!quantity || quantity < 1 || quantity > 100) {
      setWarning('Quantity must be between 1 and 100');
      return;
    }

    setLoading(true);
    setWarning('');

    try {
      // Get user data from localStorage
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      const useremail = userData.email;

      if (!useremail) {
        window.location.href = "/signup";
        return;
      }

      // Check if user is verified
      const verifyRes = await fetch(`${API}/api/auth/check-verification?email=${useremail}`);
      const verifyData = await verifyRes.json();

      if (!verifyData.verified) {
        window.location.href = "/signup";
        return;
      }

      // Prepare cart with the selected service and quantity
      const cart = [{ id: service.id, quantity }];
      
      console.log('Sending cart to backend:', cart);
      
      // Send request to create PayPal order
      const response = await fetch(`${API}/api/paypal/orders`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(cart),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create PayPal order');
      }

      const data = await response.json();
      console.log('Order creation response:', data);

      if (!data.jsonResponse || !data.jsonResponse.id) {
        throw new Error('Invalid PayPal order response structure');
      }

      const orderId = data.jsonResponse.id;
      
      // Redirect to PayPal checkout
     window.location.href = `https://www.paypal.com/checkoutnow?token=${orderId}`;
      
    } catch (err) {
      console.error('Checkout process failed:', err);
      setWarning(`Checkout failed: ${err instanceof Error ? err.message : 'Please try again later.'}`);
    } finally {
      setLoading(false);
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
                    disabled={loading}
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
                    disabled={loading}
                  />
                  <button 
                    className="btn btn-outline-secondary" 
                    onClick={() => handleQuantityChange(service.id, true)}
                    disabled={loading}
                  >
                    +
                  </button>
                </div>
                {warning && (
                  <div className="alert alert-warning text-center py-2 mb-3">{warning}</div>
                )}
                <button
                  className="btn btn-outline-success rounded-pill px-4"
                  onClick={() => handleCheckout(service)}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Processing...
                    </>
                  ) : (
                    'Checkout Now'
                  )}
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