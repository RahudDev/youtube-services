import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="terms-container" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Terms of Service</h1>
      <p><em>Last updated: May 21, 2025</em></p>

      <p>
        Welcome to <strong>MilkyWayCluster</strong> (“we”, “our”, or “us”).
        These Terms of Service (“Terms”) govern your access to and use of our application and related services (the “Service”).
        By using the Service, you agree to these Terms.
      </p>

      <hr />

      <h2>1. Use of the Service</h2>
      <ul>
        <li>You may use the Service only in compliance with these Terms and all applicable laws.</li>
        <li>You must be at least 13 years old or have guardian permission to use the Service.</li>
        <li>You agree not to misuse the Service, including attempting to reverse engineer or disrupt functionality.</li>
      </ul>

      <hr />

      <h2>2. Account Registration</h2>
      <ul>
        <li>Account creation requires a valid email and password.</li>
        <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
        <li>We do not request or store any social login (e.g., Google, Facebook) credentials.</li>
      </ul>

      <hr />

      <h2>3. Data Use</h2>
      <ul>
        <li>We store your email address and a securely hashed password.</li>
        <li>We may collect limited analytics to improve performance.</li>
      </ul>

      <hr />

      <h2>4. Intellectual Property</h2>
      <p>
        All content, trademarks, and assets used in the Service are our property or licensed to us.
        You may not use or copy them without our explicit permission.
      </p>

      <hr />

      <h2>5. Termination</h2>
      <p>
        We reserve the right to suspend or terminate access to the Service if you violate these Terms.
      </p>

      <hr />

      <h2>6. Disclaimer</h2>
      <p>
        The Service is provided “as is” without any warranty.
        We are not liable for damages resulting from use or inability to use the Service.
      </p>

      <hr />

      <h2>7. Changes to Terms</h2>
      <p>
        We may update these Terms at any time. Continued use after changes indicates your acceptance of the updated Terms.
      </p>

      <hr />

      <h2>Contact</h2>
      <p>Questions? Contact us at: <strong><a href="mailto:milkywaycluster0@gmail.com">milkywaycluster0@gmail.com</a></strong></p>
    </div>
  );
};

export default Terms;
