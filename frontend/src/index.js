import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-3wy5or8fjyo4eoqt.us.auth0.com" // It's okay for demonstration, but move this to a .env file for production
    clientId="PDC04p2SKtBTTbpsBqzkGN6WHGaGLTh1" // It's okay for demonstration, but move this to a .env file for production
    redirectUri={window.location.origin}
    scope="openid profile email"
  >
    <App />
  </Auth0Provider>
);

reportWebVitals();
