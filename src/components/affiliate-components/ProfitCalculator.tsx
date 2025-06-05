import React, { useState } from 'react';

const ProfitCalculator = () => {
  const [orderValue, setOrderValue] = useState<string>('1000'); // default example
  const commissionRate = 0.2; // 20% commission

  const numericValue = parseFloat(orderValue);
  const profit = isNaN(numericValue) ? 0 : numericValue * commissionRate;

  return (
    <section className="py-5 text-center">
      <div className="container">
        <h2 className="fw-bold mb-4">Calculate Your Profit</h2>
        <p className="mb-3">If your friend places an order:</p>

        <div className="mx-auto" style={{ maxWidth: 400 }}>
          <div className="input-group mb-3 shadow-sm">
            <span className="input-group-text bg-primary text-white fw-semibold">$</span>
            <input
              type="text"
              className="form-control"
              value={orderValue}
              onChange={(e) => {
                const value = e.target.value;
                // Allow only digits and decimal point
                if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
                  setOrderValue(value);
                }
              }}
              placeholder="e.g. 10"
            />
          </div>
          <p className="fs-5">
            Your Profit: <span className="fw-bold text-success">${profit.toFixed(2)}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProfitCalculator;
