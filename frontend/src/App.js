import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './mygame.png';
// Import Auth0 components
import LoginButton from './components/login_out/LoginButton';
import LogoutButton from './components/login_out/LogoutButton';
import ProfileTest from './components/login_out/ProfileTest';

// Import components for routing
import CreatePost from './components/CreatePost/CreatePost';


function App() {
  return (
    <Router>
      <div className="App">
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
