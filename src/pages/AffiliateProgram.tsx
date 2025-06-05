import React from 'react';
import HowItWorks from '../components/affiliate-components/HowItWorks';
import Benefits from '../components/affiliate-components/Benefits';
import ProfitCalculator from '../components/affiliate-components/ProfitCalculator';
import GetLogoButton from '../components/affiliate-components/GetLogoButton';
import FAQ from '../components/affiliate-components/FAQ';
import { Link } from 'react-router-dom'; // If you're using React Router

const AffiliateProgram = () => (
  <main className="affiliate-program-page">
    <header className="text-center py-5 bg-primary">
      <div className="container">
        <h1 className="fw-bold display-5">Join Our Affiliate Program</h1>
        <p className="lead mt-3">
          Earn passive income by promoting our platform and{' '}
          <strong>helping other creators grow their channels</strong>.
        </p>
        <p className="fs-5 mt-2">
          Turn your network into revenue, inspire growth in the creator community, and get rewarded for every successful referral.
        </p>
        <p className="fs-5 mt-2">
          Earn 20% commission with our high-converting YouTube services.
        </p>
        <p className="mt-3 text-uppercase fw-semibold">It's free. It's easy. It's rewarding.</p>

        {/* Sign Up Button /affiliate-program/signup */}
       <div className="mt-4">
  <a
    href="/affiliate-program/signup"
    className="btn btn-light btn-lg fw-bold px-4 py-2 rounded-pill shadow"
  >
    Apply Today
  </a>
  </div>

      </div>
    </header>

    <HowItWorks />
    <Benefits />
    <ProfitCalculator />
    <GetLogoButton />
    <FAQ />
  </main>
);

export default AffiliateProgram;
