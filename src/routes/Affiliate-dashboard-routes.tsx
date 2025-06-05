import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PaymentSettings from '../components/affiliate-dashboard/PaymentSettings';
import PaymentHistory from '../components/affiliate-dashboard/PaymentHistory';
import AffiliatePrivacy from '../components/affiliate-dashboard/AffiliatePrivacy';
import AffiliateTerms from '../components/affiliate-dashboard/AffiliateTerms';

const AffiliateDashboardRoutes = () => {
  return (
    <Routes>
     
      <Route path="payment-settings" element={<PaymentSettings />} />
      <Route path="payment-history" element={<PaymentHistory />} />
     <Route path="privacy" element={<AffiliatePrivacy />} />
      <Route path="terms" element={<AffiliateTerms />} />

    </Routes>
  );
};

export default AffiliateDashboardRoutes;
