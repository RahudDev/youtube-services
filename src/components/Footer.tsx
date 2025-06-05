import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  // Helper to navigate and scroll top
  const handleClick = (path: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid #ddd',
        padding: '0.75rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: '0.9rem',
        marginTop: 'auto',
        gap: '0.5rem',
      }}
    >
      <p style={{ margin: 0, color: '#6c757d' }}>
        © {new Date().getFullYear()} MilkyWayCluster. All rights reserved.
      </p>
      <nav aria-label="Footer navigation">
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            gap: '1.5rem',
          }}
        >
          <li>
            <a
              href="/terms"
              onClick={handleClick('/terms')}
              style={{ color: '#007bff', textDecoration: 'none', cursor: 'pointer' }}
              aria-label="Terms of Service"
            >
              Terms of Service
            </a>
          </li>
          <li>
            <a
              href="/privacy"
              onClick={handleClick('/privacy')}
              style={{ color: '#007bff', textDecoration: 'none', cursor: 'pointer' }}
              aria-label="Privacy Policy"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="/affiliate-program"
              onClick={handleClick('/affiliate-program')}
              style={{ color: '#007bff', textDecoration: 'none', cursor: 'pointer' }}
              aria-label="Partner with Us"
            >
              Partner with Us
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
