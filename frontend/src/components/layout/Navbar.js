import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from '../login_out/LoginButton';
import LogoutButton from '../login_out/LogoutButton';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../mygame.png';

const Navbar = () => {
  const { isAuthenticated, user } = useAuth0();
  const [showDropdown, setShowDropdown] = useState(false);

  // Toggle dropdown menu
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <nav>
      <Link to="/"> 
        <img src={logo} alt="Logo" style={{ height: '50px' }} />
      </Link>

      <input type="text" placeholder="Search..." disabled />

      {!isAuthenticated && <LoginButton />}
      
      {isAuthenticated && (
        <div style={{ position: 'relative' }}>
          <img 
            src={user.picture} 
            alt="Profile" 
            style={{ height: '50px', borderRadius: '50%', cursor: 'pointer' }} 
            onClick={toggleDropdown}
          />
          {showDropdown && (
            <div className="dropdown-menu">
              <p>Hey {user.name}</p>
              <Link to="/profile" onClick={() => setShowDropdown(false)}>Go to Profile</Link>
              <br></br>
              <Link to="/settings" onClick={() => setShowDropdown(false)}>Settings</Link>
              <br></br>
              <LogoutButton />
            </div>
          )}

        </div>
      )}
    </nav>
  );
};

export default Navbar;
