import React from 'react';
import { useNavigate } from 'react-router-dom';


const AffiliateTerms = () => {
      const navigate = useNavigate();

  return (
    <div className="container py-5" style={{ maxWidth: 800 }}>
       <div className="mb-4">
        <button
          className="btn btn-link text-decoration-none fw-bold"
          onClick={() => navigate('/affiliate-dashboard')}
        >
          ← Back to Dashboard
        </button>
      </div>
      <h1 className="mb-4">Affiliate Program Terms and Conditions</h1>

      <p>
        Welcome to our Affiliate Program! These Terms and Conditions ("Terms") govern your participation as an affiliate in our program. By enrolling as an affiliate, you agree to comply with and be bound by these Terms. Please read them carefully before proceeding.
      </p>

      <h2>1. Enrollment</h2>
      <p>
        To become an affiliate, you must submit a complete application via our website. We reserve the right to accept or reject any application at our sole discretion. Once accepted, you will receive a unique affiliate ID and referral link to promote our services.
      </p>

      <h2>2. Affiliate Obligations</h2>
      <p>
        As an affiliate, you agree to actively promote our products and services in a lawful, ethical, and professional manner. You shall not engage in any deceptive, misleading, or unethical advertising practices, including but not limited to false claims, spamming, or unauthorized use of trademarks.
      </p>

      <h2>3. Referral Tracking and Commissions</h2>
      <p>
        We track referrals using unique links tied to your affiliate ID. Commissions will be calculated based on eligible sales made through your referral link. The current commission structure is detailed in your affiliate dashboard and may be updated from time to time. Commissions are paid out according to the schedule outlined in your affiliate account.
      </p>

      <h2>4. Payment Terms</h2>
      <p>
        Commissions will be paid out only after reaching the minimum payout threshold, which is clearly indicated in your affiliate dashboard. Payments are processed via your chosen payment method, and you are responsible for providing accurate payment information. We are not liable for delays or losses resulting from incorrect payment details.
      </p>

      <h2>5. Intellectual Property</h2>
      <p>
        We grant you a limited, non-exclusive, non-transferable license to use our logos, trademarks, and promotional materials solely for the purpose of promoting our products under this affiliate program. Any unauthorized use of our intellectual property is strictly prohibited.
      </p>

      <h2>6. Termination</h2>
      <p>
        We reserve the right to terminate your participation in the affiliate program at any time for any reason, including violation of these Terms or any illegal or unethical behavior. Upon termination, you must immediately cease all promotional activities and remove all references to our brand.
      </p>

      <h2>7. Limitation of Liability</h2>
      <p>
        We shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your participation in the affiliate program. Your sole remedy shall be limited to any commissions earned up to the date of termination.
      </p>

      <h2>8. Indemnification</h2>
      <p>
        You agree to indemnify, defend, and hold harmless our company, affiliates, officers, directors, and employees from any claims, damages, liabilities, costs, or expenses arising from your breach of these Terms or any unlawful conduct.
      </p>

      <h2>9. Changes to Terms</h2>
      <p>
        We reserve the right to modify these Terms at any time. Changes will be communicated via your affiliate dashboard or registered email. Continued participation in the program after changes constitutes acceptance of the new Terms.
      </p>

      <h2>10. Governing Law</h2>
      <p>
        These Terms shall be governed by and construed in accordance with the laws of the jurisdiction where our company is registered, without regard to conflict of law principles.
      </p>

      <p>
        By participating in the Affiliate Program, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
      </p>
    </div>
  );
};

export default AffiliateTerms;
