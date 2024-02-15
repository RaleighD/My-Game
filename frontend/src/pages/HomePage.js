import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../mygame.png';
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from 'react';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();
  // Redirect to /feed if the user is already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/feed');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Welcome to</h1>
      <img src={logo} alt="MyGame Logo" style={{ maxWidth: '300px', margin: '20px auto' }} />
      <p>Your life starts now.</p>
    </div>
  );
};

export default HomePage;
