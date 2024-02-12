import React, { useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { ThemeContext } from '../components/layout/ThemeContext';

const SettingsPage = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { user, getAccessTokenSilently, logout } = useAuth0(); // Destructure logout from useAuth0

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const deleteAccount = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!isConfirmed) {
      return; // User canceled the operation
    }

    try {
      const userId = user.sub;
      const token = await getAccessTokenSilently();
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/delete?userId=${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to delete account");
      }

      // Account deletion was successful, log the user out
      logout({ returnTo: window.location.origin }); // Redirect user to home page after logout
    } catch (error) {
      console.error('Error deleting account:', error);
      alert("Error deleting account. Please try again.");
    }
  };

  return (
    <div>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
      <button onClick={deleteAccount} style={{ marginTop: '20px', backgroundColor: 'red', color: 'white' }}>
        Delete Account
      </button>
    </div>
  );
};

export default SettingsPage;
