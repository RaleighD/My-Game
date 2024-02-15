import React, { useContext, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { ThemeContext } from '../components/layout/ThemeContext';
import Modal from '../components/Post/Modal';

const SettingsPage = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { user, getAccessTokenSilently, logout } = useAuth0(); // Destructure logout from useAuth0
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  }

  const handleConfirmDelete = async () =>{
    setDeleteModalOpen(false);
    await deleteAccount();
  }

  const deleteAccount = async () => {
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
      <button onClick={handleDeleteClick}>
        Delete Account
      </button>
      <Modal isOpen={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <img src="/images/rimtobinson.gif" alt="Funny meme" />
        <button onClick={() => setDeleteModalOpen(false)}>Cancel</button>
        <button onClick={handleConfirmDelete}>I'm not worried about it.</button>
      </Modal>

    </div>
  );
};

export default SettingsPage;
