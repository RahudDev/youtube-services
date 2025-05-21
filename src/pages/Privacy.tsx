import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="privacy-container" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Privacy Policy</h1>
      <p><em>Last updated: May 21, 2025</em></p>

      <p>
        This Privacy Policy describes how <strong>MilkyWayCluster - YouTube Services</strong> (“we”, “our”, or “us”)
        collects, uses, and shares information about you when you use our Service.
      </p>

      <hr />

      <h2>1. Information We Collect</h2>

      <h3>a. Data from YouTube API</h3>
      <ul>
        <li>Channel information</li>
        <li>Video metadata</li>
        <li>View and engagement statistics</li>
      </ul>
      <blockquote>
        <strong>Note:</strong> We access only public data as allowed by YouTube’s API.
        No private videos or personal account details are collected.
      </blockquote>

      <h3>b. Account Data</h3>
      <p>When you sign up manually using email and password, we collect:</p>
      <ul>
        <li>Email address</li>
        <li>Encrypted password</li>
      </ul>
      <p>
        We do not store any third-party credentials (e.g., Google OAuth). All passwords are securely hashed and never stored in plain text.
      </p>

      <h3>c. Automatically Collected Data</h3>
      <p>We may collect anonymized usage data such as:</p>
      <ul>
        <li>Device type and browser</li>
        <li>Feature usage</li>
        <li>Crash logs (for debugging only)</li>
      </ul>

      <hr />

      <h2>2. How We Use the Data</h2>
      <ul>
        <li>To display YouTube content and stats</li>
        <li>To manage your account and authenticate access</li>
        <li>To improve app performance and experience</li>
        <li>For analytics and bug fixing</li>
      </ul>

      <hr />

      <h2>3. Third-Party Services</h2>
      <p>We use the YouTube Data API to display public YouTube data. We do not integrate third-party analytics or login systems.</p>
      <p>By using our app, you also agree to:</p>
      <ul>
        <li>
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            Google Privacy Policy
          </a>
        </li>
      </ul>

      <hr />

      <h2>4. Data Security</h2>
      <p>
        We implement standard security measures to protect your data,
        including password hashing and HTTPS transmission. However, no method of transmission is 100% secure.
      </p>

      <hr />

      <h2>5. Your Rights</h2>
      <ul>
        <li>Request deletion of your account and associated data</li>
        <li>Contact us for questions or concerns about your privacy</li>
      </ul>

      <hr />

      <h2>6. Children's Privacy</h2>
      <p>
        This Service is not intended for children under 13.
        We do not knowingly collect personal information from children.
      </p>

      <hr />

      <h2>7. Changes to This Policy</h2>
      <p>
        We may revise this Privacy Policy periodically.
        Updated versions will be posted here with a new date.
      </p>

      <hr />

      <h2>Contact Us</h2>
      <p>
        Questions? Reach us at: <strong>milkywaycluster0@gmail.com</strong>
      </p>
    </div>
  );
};

export default Privacy;
