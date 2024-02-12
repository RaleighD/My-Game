import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../mygame.png';
import Modal from '../components/CreatePost/Modal';
import CreatePost from '../components/CreatePost/CreatePost';
import { useAuth0 } from "@auth0/auth0-react";
import { useProfile } from '../components/layout/ProfileContext'; // Ensure this path matches your project structure

const HomePage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { profileComplete, setProfileComplete } = useProfile(); // Use context for profile completion state
  const { REACT_APP_API_URL } = process.env;
  
  console.log("API URL is:", REACT_APP_API_URL);

  useEffect(() => {
    if (isAuthenticated) {
      checkUserProfileCompletion();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  const checkUserProfileCompletion = async () => {
    const userId = user.sub;
    console.log("user sub:",user.sub)
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${REACT_APP_API_URL}/api/users/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
        credentials: 'include',
      });
      const data = await response.json();
      setProfileComplete(data.isComplete);
      console.log("Response from server", data.isComplete)
    } catch (error) {
      console.error('Error checking user profile completion:', error);
    }
  };

  useEffect(() => {
    // Redirect to the register page if the profile is not complete
    if (isAuthenticated && !profileComplete) {
      navigate('/register');
    }
  }, [isAuthenticated, profileComplete, navigate]);

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

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Welcome to MyGame</h1>
      <img src={logo} alt="MyGame Logo" style={{ maxWidth: '300px', margin: '20px auto' }} />
      <p>Your life starts now.</p>
      
      {/* Button to open the modal */}
      <button onClick={handleOpenModal}>Create Post</button>

      {/* Modal for creating a post */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <CreatePost />
      </Modal>
    </div>
  );
};

export default HomePage;
