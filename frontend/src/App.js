import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import Auth0 components
import LoginButton from './component/login_out/LoginButton';
import LogoutButton from './component/login_out/LogoutButton';
import ProfileTest from './component/login_out/ProfileTest';

// Import components for routing
import CreatePost from './components/CreatePost/CreatePost';
import logo from './mygame.png';

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
