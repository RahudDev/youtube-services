import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        height: '60px',
        borderTop: '1px solid #ddd',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '0.9rem',
        marginTop: 'auto',
      }}
    >
      <p style={{ margin: 0 }}>
        © {new Date().getFullYear()} MilkyWayCluster. All rights reserved.
      </p>
      <div style={{ marginTop: '0.2rem' }}>
        <Link to="/terms" style={{ marginRight: '1rem', color: '#007bff', textDecoration: 'none' }}>
          Terms of Service
        </Link>
        <Link to="/privacy" style={{ color: '#007bff', textDecoration: 'none' }}>
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
