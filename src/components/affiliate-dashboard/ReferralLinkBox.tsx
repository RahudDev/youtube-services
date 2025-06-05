import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { web_url } from '../../config';
import { API } from '../../App';

const ReferralLinkCard = () => {
  const [referralCode, setReferralCode] = useState('');

  useEffect(() => {
    const fetchReferralCode = async () => {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const email = user?.email;

      if (!email) return;

      try {
        const response = await axios.get(`${API}/api/affiliate/referral-code?email=${encodeURIComponent(email)}`);
        setReferralCode(response.data.referralCode);
      } catch (error) {
        console.error('Error fetching referral code:', error);
      }
    };

    fetchReferralCode();
  }, []);

  const referralLink = `${web_url}?ref=${referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    alert('Referral link copied!');
  };

  return (
    <section className="py-5 text-center">
      <div className="container">
        <h2 className="fw-bold mb-3">Your Referral Link</h2>
        <div className="input-group mx-auto" style={{ maxWidth: 600 }}>
          <input
            type="text"
            className="form-control"
            value={referralLink}
            readOnly
          />
          <button className="btn btn-primary" onClick={copyToClipboard}>
            Copy
          </button>
        </div>
        <p className="mt-3">
          Share your link on social media, blogs, or with friends to start earning!
        </p>
      </div>
    </section>
  );
};

export default ReferralLinkCard;
