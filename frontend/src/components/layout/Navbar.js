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
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = async (e) => {
      const query = e.target.value;
      setSearchQuery(query);
      try {
          const response = await fetch(`/api/users?query=${query}`);
          const data = await response.json();
          setSearchResults(data);
        } catch (err) {
            console.error('Error fetching search results:', err);
        }
  };

  // Toggle dropdown menu
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleUserClick = (userId) => {
        // Implement navigation to user profile page
    };

  // Safe check for user before trying to access its properties
  const userId = user?.sub; // Use optional chaining to avoid errors



  return (
    <nav>
      <Link to="/"> 
        <img src={logo} alt="Logo" style={{ height: '50px' }} />
        <Link to="/my-league" className="my-league-link">My-Leagues</Link>
      </Link>

        <input type="text" value={searchQuery} onChange={handleChange} placeholder="Search users" />
        <ul>
            {searchResults.map(user => (
                <li key={user._id} onClick={() => handleUserClick(user._id)}>{user.name}</li>
            ))}
        </ul>

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
