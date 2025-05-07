import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

// React Snap friendly wrapper
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter basename="/youtube-services">
      <App />
      {/* Hidden route links for react-snap to pre-render */}
      <div style={{ display: 'none' }}>
        <a href="/youtube-services/m/services">Services</a>
        <a href="/youtube-services/m/login">Login</a>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
