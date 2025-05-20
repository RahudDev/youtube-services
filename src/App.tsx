import React, { useState, useEffect } from 'react';
import { App as CapacitorApp } from '@capacitor/app';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import { API_URL } from './config';

const API_MAIN = API_URL.split(',');
export const API = API_MAIN[1];

const App = () => {
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




  useEffect(() => {
  let listener: any;

  CapacitorApp.addListener('appUrlOpen', (event) => {
    const url = event.url;
    if (url && url.includes('confirm-email')) {
      const token = new URL(url).searchParams.get('token');
      if (token) {
        window.location.href = `/confirm-email?token=${token}`;
      }
    }
  }).then((res) => {
    listener = res;
  });

  return () => {
    if (listener && typeof listener.remove === 'function') {
      listener.remove();
    }
  };
}, []);




  return (
    <div>
      <button className="theme-toggle-btn" onClick={toggleTheme}>
        {darkMode ? '🌙' : '🌞'}
      </button>
      <AppRoutes />
    </div>
  );
};

export default App;
