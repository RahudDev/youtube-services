import React, { useState, useEffect } from 'react';
import './App.css';  // Ensure the CSS file is imported
import AppRoutes from './routes/AppRoutes';
import {API_URL} from './config';
import MessengerLink from './pages/Messenger';

const API_MAIN = API_URL.split(',');
export const API = API_MAIN[1];


const App = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    // Default to dark mode if no saved theme or if saved theme is dark
    if (savedTheme === 'light') {
      return false;  // light mode
    }
    return true;  // default to dark mode if no saved theme or if saved theme is dark
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
    <div>
      <button
        className="theme-toggle-btn"
        onClick={toggleTheme}
      >
        {darkMode ? '🌙' : '🌞'}
      </button>
      <AppRoutes />
    <MessengerLink/>
    </div>
  );
};

export default App;
