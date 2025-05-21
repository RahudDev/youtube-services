import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => setMenuOpen(!menuOpen);

   const [darkMode, setDarkMode] = useState<boolean>(() => {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme !== 'light'; // Default to dark mode
    });
  
    const toggleTheme = () => {
      setDarkMode((prevMode) => {
        const newMode = !prevMode;
        localStorage.setItem('theme', newMode ? 'dark' : 'light');
        return newMode;
      });
    };
  
    useEffect(() => {
      if (darkMode) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
      } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
      }
    }, [darkMode]);
  
  return (
    <>
      <header
        style={{
          height: '60px',
          borderBottom: '1px solid #ddd',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 1.5rem',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}
      >
        {/* Brand name - visible on desktop only */}
        <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }} className="brand-desktop">
             <button className="theme-toggle-btn" onClick={toggleTheme}>
        {darkMode ? '🌙' : '🌞'}
      </button>
        </div>
        
        {/* Desktop Navigation - visible on desktop only */}
        <nav className="nav-links-desktop" style={{marginRight: '150px'}}>
          <Link className='nav-milky'  to="/dashboard"  style={linkStyle}>Home</Link>
        <Link className='nav-milky'  to="/channel-info"style={linkStyle}>Insight</Link>
        <Link className='nav-milky'  to="/services" style={linkStyle}>Services</Link>
        </nav>

        {/* Hamburger Icon - Only visible on mobile */}
        <div
          onClick={toggleMenu}
          style={{
            display: 'none',
            flexDirection: 'column',
            cursor: 'pointer',
          }}
          className="hamburger-mobile"
        >
          <span style={barStyle}></span>
          <span style={barStyle}></span>
          <span style={barStyle}></span>
        </div>
      </header>

      {/* Overlay that blurs the background when menu is open */}
      {menuOpen && (
        <div 
          style={overlayStyle} 
          onClick={toggleMenu}
        ></div>
      )}

      {/* Left Side Slide-in Menu - Mobile only */}
      <div 
        style={{
          ...sideMenuStyle,
          transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
        }}
        className="side-menu-mobile"
      >
        <div style={menuHeaderStyle}>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
             <button className="theme-toggle-btn" onClick={toggleTheme}>
        {darkMode ? '🌙' : '🌞'}
      </button>
          </div>
        </div>
        <Link className='nav-milky'  to="/dashboard" onClick={toggleMenu} style={sideMenuLinkStyle}>Home</Link>
        <Link className='nav-milky'  to="/channel-info" onClick={toggleMenu} style={sideMenuLinkStyle}>Insight</Link>
        <Link className='nav-milky'  to="/services" onClick={toggleMenu} style={sideMenuLinkStyle}>Services</Link>
      </div>

      {/* Responsive styles */}
      <style>
        {`
          @media (max-width: 768px) {
            .brand-desktop {
              display: none;
            }
            .nav-links-desktop {
              display: none;
            }
            .hamburger-mobile {
              display: flex !important;
            }
            header {
              justify-content: flex-start !important;
            }
          }
        `}
      </style>
    </>
  );
};

const linkStyle: React.CSSProperties = {
  marginLeft: '1rem',
  textDecoration: 'none',
  fontWeight: 500,
};

const barStyle: React.CSSProperties = {
  width: '25px',
  height: '3px',
  backgroundColor: '#333',
  margin: '4px 0',
};

const sideMenuStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '50%', // Half page width on mobile
  height: '100vh',
  boxShadow: '2px 0 6px rgba(0,0,0,0.1)',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 1001,
  transition: 'transform 0.3s ease',
  padding: '0 0 1rem 0',
};


const menuHeaderStyle: React.CSSProperties = {
  height: '60px',
  display: 'flex',
  alignItems: 'center',
  padding: '0 1.5rem',
  borderBottom: '1px solid #ddd',
  marginBottom: '1rem',
};

const sideMenuLinkStyle: React.CSSProperties = {
  padding: '0.75rem 1.5rem',
  textDecoration: 'none',
  fontWeight: 500,
  borderBottom: '1px solid #f0f0f0',
};

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.3)',
  backdropFilter: 'blur(4px)',
  zIndex: 1000,
};

export default Header;