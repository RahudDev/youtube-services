import React, {  useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { App as CapacitorApp } from '@capacitor/app';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import { API_URL } from './config';
import Footer from './components/Footer';
import Header from './components/Header';

const API_MAIN = API_URL.split(',');
export const API = API_MAIN[1];

const App = () => {



  useEffect(() => {
  let listener: any;

  CapacitorApp.addListener('appUrlOpen', (event) => {
    const url = event.url;
    if (url) {
      const parsedUrl = new URL(url);
      const pathname = parsedUrl.pathname;
      const token = parsedUrl.searchParams.get('token');

      if (pathname === '/confirm-email' && token) {
        window.location.href = `/confirm-email?token=${token}`;
      } else if (pathname === '/reset-password' && token) {
        window.location.href = `/reset-password?token=${token}`;
      } else if (pathname === '/completed' && token) {
        window.location.href = `/completed?token=${token}`;
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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
       <Header />
       <main style={{ flex: 1 }}>
      <AppRoutes />
      </main>
      <Footer/>
    </div>
  );
};

export default App;
