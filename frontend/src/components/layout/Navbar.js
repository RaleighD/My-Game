import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from '../login_out/LoginButton';
import LogoutButton from '../login_out/LogoutButton';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../mygame.png';

const Navbar = () => {
    const { isAuthenticated, user } = useAuth0();
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const handleChange = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.length > 2) {
            try {
                const response = await fetch(`/api/users?query=${encodeURIComponent(query)}`);
                const data = await response.json();
                setSearchResults(data);
            } catch (err) {
                console.error('Error fetching search results:', err);
            }
        } else {
            setSearchResults([]); // Clear results if query length is 2 or less
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`); // Navigate to search results
        setSearchQuery('');
        setSearchResults([]);
    };

    // Toggle dropdown menu
    const toggleDropdown = () => setShowDropdown(!showDropdown);

    const handleUserClick = (userId) => {
        navigate(`/profile/${userId}`); // Navigate to user profile page
        setSearchResults([]); // Clear search results on navigation
    };

    return (
        <nav className="navbar">
            <Link to="/">
                <img src={logo} alt="Logo" className="navbar-logo" />
            </Link>
            <form onSubmit={handleSearchSubmit} className="search-form">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleChange}
                    placeholder="Search"
                    className="search-input"
                />
                {searchResults.length > 0 && (
                    <ul className="search-results-dropdown">
                        {searchResults.map(user => (
                            <li key={user._id} onClick={() => handleUserClick(user._id)}>{user.nickname}</li>
                        ))}
                    </ul>
                )}
                <button type="submit" className="search-button">Search</button>
            </form>
            {!isAuthenticated ? (
                <LoginButton />
            ) : (
                <div className="user-section">
                    <img
                        src={user?.picture}
                        alt="Profile"
                        className="profile-picture"
                        onClick={toggleDropdown}
                    />
                    {showDropdown && (
                        <div className="dropdown-menu">
                            <p>Hey, {user?.nickname}!</p>
                            <Link to={`/profile/${user?.sub}`} onClick={() => setShowDropdown(false)}>Go to Profile</Link>
                            <br />
                            <Link to="/messages" onClick={() => setShowDropdown(false)}>Messages</Link>
                            <br />
                            <Link to="/settings" onClick={() => setShowDropdown(false)}>Settings</Link>
                            <br />
                            <Link to="/my-team" className="my-team-link">My Teams</Link>
                            <LogoutButton />
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
