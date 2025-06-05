import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AffiliateForm from '../components/affiliate-components/Signup-Affiliate';
import AffiliatePrivacyprogram from '../components/affiliate-components/affiliate-privacy';
import AffiliateTermsProgram from '../components/affiliate-components/affiliate-terms';

const AffiliateProgramRoutes = () => {
  // Submit handler function
  const handleAffiliateSubmit = (data: any) => {
    console.log("Submitted affiliate form:", data);
    // 🔁 Make a fetch/axios POST call here
  };

  return (
    <Routes>
      <Route
        path="signup"
        element={
          <AffiliateForm
            isNewUser={true}
            onSubmit={handleAffiliateSubmit}
          />
        }
      />
      <Route path="privacy" element={<AffiliatePrivacyprogram />} />
      <Route path="terms" element={<AffiliateTermsProgram />} />
    </Routes>
  );
};

export default AffiliateProgramRoutes;
