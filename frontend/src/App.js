import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import logo from './mygame.png';
// Import Auth0 components
import LoginButton from './components/login_out/LoginButton';
import LogoutButton from './components/login_out/LogoutButton';
import ProfileTest from './components/login_out/ProfileTest';
import ProtectedCreatePost from './components/CreatePost/ProtectedCreatePost';


//testing modal
import Modal from './components/CreatePost/Modal';


// Import components for routing
import CreatePost from './components/CreatePost/CreatePost';


function App() {

  //testing modal
  const [isModalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  }
  const handleCloseModal = () => {
    setModalOpen(false)
  }

  return (
    <Router>
      <div className="App">
        <div>
        <button onClick={handleOpenModal}>Create Post</button>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <CreatePost />
        </Modal>
        {/* Rest of your application */}
      </div>
        <header className="App-header">
          <img src={logo} alt="MyGame Logo" className="App-logo" />
          <LoginButton />
          <LogoutButton />
          <ProfileTest />
          
        </header>
        <Routes>
          
          <Route path="/create-post" element={<CreatePost />} />
          {/* other routes */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
