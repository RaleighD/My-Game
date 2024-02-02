import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain={'dev-3wy5or8fjyo4eoqt.us.auth0.com'}
    clientId={'PDC04p2SKtBTTbpsBqzkGN6WHGaGLTh1'}
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>
);

reportWebVitals();
