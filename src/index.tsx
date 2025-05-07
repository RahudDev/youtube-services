import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* Wrap your app in BrowserRouter to manage routes */}
    <BrowserRouter basename="/youtube-services">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
