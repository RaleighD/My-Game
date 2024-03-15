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
  const [showNotifications, setShowNotifications] = useState(false);

  // Toggle dropdown menu
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const toggleNotifications = () => setShowNotifications(!showNotifications); 

  const userId = user?.sub; 
  console.log("User id: ", userId);

  return (
    <nav>
      <div className="left-nav">
        <Link to="/">
          <img src={logo} alt="Logo" style={{ height: '50px' }} />
        </Link>
        <Link to="/my-team" className="my-team-link">My-Team</Link>
      </div>
      <input type="text" placeholder="Search..." className="search-bar"/>
      <div className="right-nav">
        {!isAuthenticated ? (
          <LoginButton />
        ) : (
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            {/* SVG Notification Icon */}
            <svg onClick={toggleNotifications} className ='.notification-button' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer', marginRight: '10px' }}>
              <path d="M12 2C7.03 2 3 6.03 3 11V17L1 19V20H23V19L21 17V11C21 6.03 16.97 2 12 2ZM12 4C16.07 4 19.5 7.43 19.5 11.5V17H4.5V11.5C4.5 7.43 7.93 4 12 4ZM12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22Z" fill="#000000"/>
            </svg>
            <img 
              src={user?.picture} // Use optional chaining
              alt="Profile" 
              style={{ height: '50px', borderRadius: '50%' }} 
              onClick={toggleDropdown}
            />
            {showDropdown && (
              <div className="dropdown-menu">
                <p>Hey, {user?.nickname}!</p> {/* Use optional chaining */}
                <Link to={`/profile/${userId}`} onClick={() => setShowDropdown(false)}>Go to Profile</Link>
                <br />
                <Link to="/settings" onClick={() => setShowDropdown(false)}>Settings</Link>
                <br />
                <LogoutButton />
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
