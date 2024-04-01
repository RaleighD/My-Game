import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from '../login_out/LoginButton';
import LogoutButton from '../login_out/LogoutButton';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../mygame.png';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { isAuthenticated, user } = useAuth0();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };



  // Toggle dropdown menu
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  // Safe check for user before trying to access its properties
  const userId = user?.sub; // Use optional chaining to avoid errors





    return (
    <nav>
      <Link to="/"> 
        <img src={logo} alt="Logo" style={{ height: '50px' }} />
      </Link>

        <form onSubmit={handleSearchSubmit}>
            <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearchChange} />
            <button type="submit">Search</button>
        </form>

      {!isAuthenticated ? (
        <LoginButton />
      ) : (
        <div style={{ position: 'relative' }}>
          <img 
            src={user?.picture} // Use optional chaining
            alt="Profile" 
            style={{ height: '50px', borderRadius: '50%', cursor: 'pointer' }} 
            onClick={toggleDropdown}
          />
          {showDropdown && (
            <div className="dropdown-menu">
              <p>Hey, {user?.nickname}!</p> {/* Use optional chaining */}
              <Link to={`/profile/${userId}`} onClick={() => setShowDropdown(false)}>Go to Profile</Link>
              <br />
              <Link to={"/messages" } onClick={() => setShowDropdown(false)}>Messages</Link>
              <br />
              <Link to="/settings" onClick={() => setShowDropdown(false)}>Settings</Link>
              <br />
              <LogoutButton />
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
