import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API } from "../App";
import { useNavigate } from 'react-router-dom';
import { servicesYT } from './Products/Youtube-services';
import Tooltip from 'bootstrap/js/dist/tooltip';

const Services = () => {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [warning, setWarning] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<'' | 'paypal' | 'crypto'>('');
  const navigate = useNavigate();
  const tooltipRefs = useRef<{ [key: string]: typeof Tooltip }>({});

  useEffect(() => {
    const initTooltips = () => {
      // Clean up existing tooltips
      Object.values(tooltipRefs.current).forEach(tooltip => {
        tooltip.dispose();
      });
      tooltipRefs.current = {};

      // Initialize new tooltips
      const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      tooltipElements.forEach((element) => {
        const tooltipInstance = new Tooltip(element, {
          trigger: 'hover focus',
          placement: 'left',
          container: 'body'
        });
        const id = element.getAttribute('data-service-id');
        if (id) {
          tooltipRefs.current[id] = tooltipInstance;
        }
      });
    };

    // Delay initialization to ensure DOM is ready
    const timer = setTimeout(initTooltips, 200);

    return () => {
      clearTimeout(timer);
      // Clean up tooltips on unmount
      Object.values(tooltipRefs.current).forEach(tooltip => {
        tooltip.dispose();
      });
    };
  }, [servicesYT]); // Re-run when services data changes

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

    if (!paymentMethod) {
      setWarning('Please select a payment method.');
      return;
    }

    setLoading(true);
    setWarning('');

    try {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      const useremail = userData.email;

      if (!useremail) return (window.location.href = "/signup");

      const verifyRes = await fetch(`${API}/api/auth/check-verification?email=${useremail}`);
      const verifyData = await verifyRes.json();

      if (!verifyData.verified) return (window.location.href = "/signup");

      const cart = [{ id: service.id, quantity }];

      let response;
      if (paymentMethod === 'paypal') {
        response = await fetch(`${API}/api/paypal/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({ cart, email: useremail }),
        });

        const data = await response.json();
        if (!data?.jsonResponse?.id) throw new Error('Invalid PayPal response');
        window.location.href = `https://www.paypal.com/checkoutnow?token=${data.jsonResponse.id}`;
      } else {
        response = await fetch(`${API}/api/crypto/create-payment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({ cart, email: useremail }),
        });

        const data = await response.json();
        if (!data?.invoice?.invoice_url) throw new Error('Invalid crypto response');
        window.location.href = data.invoice.invoice_url;
      }
    } catch (err) {
      console.error('Checkout failed:', err);
      setWarning(`Checkout failed: ${err instanceof Error ? err.message : 'Try again later.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="text-end mb-4">
        <button className="btn btn-outline-primary rounded-pill" onClick={() => navigate('/my-orders')}>
          View My Orders
        </button>
      </div>
      <h2 className="text-center mb-5 fw-bold">Our YouTube Services</h2>
      <div className="row justify-content-center">
        {servicesYT.map((service) => (
          <div className="col-md-6 col-lg-3 mb-4" key={service.id}>
            <div className="position-relative">
              <span
                className="position-absolute top-0 end-0 m-2 fs-5 text-primary tooltip-icon"
                data-bs-toggle="tooltip"
                data-bs-placement="left"
                data-service-id={service.id}
                title={service.description}
                style={{ 
                  cursor: 'pointer',
                  zIndex: 10,
                  backgroundColor: 'rgba(129, 123, 123, 0.9)',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold'
                }}
              >
                ?
              </span>
              <div className="card shadow-sm h-100 border-0 hover-shadow transition rounded-4">
                <img
                  src={service.image}
                  alt={service.name}
                  className="card-img-top-services p-4"
                  style={{ height: '150px', objectFit: 'contain'}}
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
                  <div className="mb-3">
                    <select
                      className="form-select"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as 'paypal' | 'crypto')}
                      disabled={loading}
                    >
                      <option value="" disabled>
                        Select payment method
                      </option>
                      <option value="paypal">PayPal & Debit/Credit card</option>
                      <option value="crypto">Crypto (Litecoin)</option>
                    </select>
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
        .tooltip-icon:hover {
          background-color: rgba(13, 110, 253, 0.1) !important;
        }
      `}</style>
    </div>
  );
};

export default Services;