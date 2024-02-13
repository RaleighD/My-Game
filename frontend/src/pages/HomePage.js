import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../mygame.png';
import Modal from '../components/CreatePost/Modal';
import CreatePost from '../components/CreatePost/CreatePost';
import { useAuth0 } from "@auth0/auth0-react";
import { useProfile } from '../components/layout/ProfileContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { profileComplete, setProfileComplete } = useProfile(); // Assuming useProfile is a context hook for profile state management
  const [isLoading, setIsLoading] = useState(true); // Manage loading state here
  const { REACT_APP_API_URL } = process.env;

  useEffect(() => {
    const checkUserProfileCompletion = async () => {
      if (!isAuthenticated) {
        setIsLoading(false); // Not authenticated, so not loading
        return; // Early return if not authenticated
      }

      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${REACT_APP_API_URL}/api/users/check`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId: user.sub }),
          credentials: 'include',
        });
        const data = await response.json();
        setProfileComplete(data.isComplete);
        if (!data.isComplete) {
          navigate('/register');
        }
        setIsLoading(false); // Loading complete
      } catch (error) {
        console.error('Error checking user profile completion:', error);
        setIsLoading(false); // Error encountered, stop loading
      }
    };

    checkUserProfileCompletion();
  }, [isAuthenticated, user?.sub, getAccessTokenSilently, navigate, setProfileComplete]);

  // State to control the modal visibility
  const [isModalOpen, setModalOpen] = useState(false);

  // Function to open the modal
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  if (isLoading) {
    return <div style={{ textAlign: 'center' }}>Checking Profile...</div>;
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Welcome to</h1>
      <img src={logo} alt="MyGame Logo" style={{ maxWidth: '300px', margin: '20px auto' }} />
      <p>Your life starts now.</p>
      
      <button onClick={handleOpenModal}>Create Post</button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <CreatePost />
      </Modal>
    </div>
  );
};

export default HomePage;
