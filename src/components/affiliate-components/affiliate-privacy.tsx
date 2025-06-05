import React from 'react';
import { useNavigate } from 'react-router-dom';


const AffiliatePrivacyprogram = () => {
    const navigate = useNavigate();
  
  return (
    <div className="container py-5" style={{ maxWidth: 800 }}>
       <div className="mb-4">
        <button
          className="btn btn-link text-decoration-none fw-bold"
          onClick={() => navigate('/affiliate-program/signup')}
        >
          ← Back to Sign Up
        </button>
      </div>
      <h1 className="mb-4">Affiliate Program Privacy Policy</h1>

      <p>
        Protecting your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard the information you provide when participating in our Affiliate Program. Please read this policy carefully.
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        When you register as an affiliate, we collect personal information including your name, email address, payment details, and any other information necessary to administer your account and process payments. We also collect data related to your referrals, clicks, and commissions earned.
      </p>

      <h2>2. How We Use Your Information</h2>
      <p>
        Your information is used to:
        <ul>
          <li>Verify your identity and eligibility to participate in the affiliate program</li>
          <li>Track referrals and calculate commissions</li>
          <li>Process payments and manage your account</li>
          <li>Communicate important program updates, promotions, and policy changes</li>
          <li>Ensure compliance with legal obligations and prevent fraud or abuse</li>
        </ul>
      </p>

      <h2>3. Data Sharing and Disclosure</h2>
      <p>
        We do not sell or rent your personal information to third parties. However, we may share information with trusted service providers who assist us with payment processing, analytics, customer support, and legal compliance. All third parties are bound by confidentiality agreements.
      </p>

      <h2>4. Cookies and Tracking Technologies</h2>
      <p>
        We use cookies and similar tracking technologies to monitor referral activity, improve user experience, and analyze program performance. You can control cookie preferences through your browser settings.
      </p>

      <h2>5. Data Security</h2>
      <p>
        We implement appropriate technical and organizational measures to protect your information from unauthorized access, alteration, disclosure, or destruction. Despite our efforts, no method of transmission or storage is 100% secure.
      </p>

      <h2>6. Your Rights</h2>
      <p>
        You have the right to access, update, or delete your personal information. You can also opt out of marketing communications by contacting our support team or using unsubscribe links. Please note that opting out may affect your participation in the affiliate program.
      </p>

      <h2>7. Retention of Data</h2>
      <p>
        We retain your personal data only as long as necessary to fulfill the purposes outlined in this policy and comply with legal obligations.
      </p>

      <h2>8. International Transfers</h2>
      <p>
        Your data may be transferred and processed in countries other than your own, including the United States. By participating, you consent to such transfers in accordance with applicable data protection laws.
      </p>

      <h2>9. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy periodically. We will notify you of significant changes via your affiliate dashboard or registered email. Continued use of the program after updates means you accept the revised policy.
      </p>

      <h2>10. Contact Us</h2>
      <p>
        If you have questions or concerns about this Privacy Policy or your personal data, please contact our Affiliate Program Support team at <a href="mailto:milkywaycluster0@gmail.com">milkywaycluster0@gmail.com</a>.
      </p>

      <p>
        By joining and using our Affiliate Program, you acknowledge that you have read, understood, and agreed to this Privacy Policy.
      </p>
    </div>
  );
};

export default AffiliatePrivacyprogram ;
