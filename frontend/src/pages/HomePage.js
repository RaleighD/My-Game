import React, { useState } from 'react';
import logo from '../mygame.png';
import Modal from '../components/CreatePost/Modal';
import CreatePost from '../components/CreatePost/CreatePost';

const HomePage = () => {
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
