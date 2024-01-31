import React from 'react';
import './App.css';
import LoginButton from './component/login_out/LoginButton';
import LogoutButton from './component/login_out/LogoutButton';
import ProfileTest from './component/login_out/ProfileTest';
import logo from './mygame.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="MyGame Logo" className="App-logo" />
        <LoginButton />
        <LogoutButton />
        <ProfileTest />
      </header>
      
    </div>
  );
}

export default App;
