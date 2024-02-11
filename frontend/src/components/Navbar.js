import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './login_out/LoginButton';
import LogoutButton from './login_out/LogoutButton';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../mygame.png';

const Navbar = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <nav>
      <Link to="/"> 
        <img src={logo} alt="Logo" style={{ height: '50px' }} />
      </Link>

      {/* Dummy search bar */}
      <input type="text" placeholder="Search..." disabled />

      {/* Conditionally render auth buttons */}
      {!isAuthenticated && <LoginButton />}
      {isAuthenticated && (
        <>
          <Link to="/profile">Profile</Link>
          <LogoutButton />
        </>
      )}
    </nav>
  );
};

export default Navbar;
