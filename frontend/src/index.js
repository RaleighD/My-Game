import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain={'dev-3wy5or8fjyo4eoqt.us.auth0.com'} //move this to a .env file once everyone has local version
    clientId={'PDC04p2SKtBTTbpsBqzkGN6WHGaGLTh1'} //move this to a .env file once everyone has local version
    redirectUri={window.location.origin}
    scope="openid profile email address phone"
  >
    <App />
  </Auth0Provider>
);

reportWebVitals();
