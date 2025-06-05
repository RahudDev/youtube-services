import React from 'react';

const Benefits = () => (
  <section className="py-5 text-center">
    <div className="container">
      <h2 className="fw-bold mb-4">Benefits of Joining</h2>
      <div className="row g-4">
        {[
          "Earn 20% commission per sale",
          "Track your performance in real-time",
          "Fast payouts via PayPal or Crypto",
          "Lifetime earnings from referred users",
        ].map((benefit, i) => (
          <div key={i} className="col-md-3">
            <div className="p-3 bg-success text-white rounded-4 shadow-sm h-100">
              <p className="mb-0">{benefit}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Benefits;
