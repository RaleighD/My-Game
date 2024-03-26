import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FeedPage from './pages/FeedPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import RegisterPage from './pages/RegisterPage';
import BaseballScorekeeper from './components/scorekeeping/baseball-scorekeeper';
import HistoricalStatInputPage from './pages/HistoricalStatInputPage';
import Layout from './components/layout/Layout'; //layout has auth0 and navbar in it
import { ThemeProvider } from './components/layout/ThemeContext'; //used for light/dark mode
import { ProfileProvider } from './components/layout/ProfileContext' //used for authing after form submission
import MyTeamPage from './pages/MyTeam';
import CreateTeam from './pages/CreateTeam';
import JoinTeam from './pages/JoinTeam';

function App() {
  return (
    <ProfileProvider>
      <Router>
      <ThemeProvider>
        <Layout> 
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/baseball-scorekeeper" element={<BaseballScorekeeper />} />
            <Route path="/historical-stats" element={<HistoricalStatInputPage />} />
            <Route path="/my-team" element={<MyTeamPage />} />
            <Route path="/create-team" element={<CreateTeam />} />
            <Route path="/join-team" element={<JoinTeam />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </Router>
    </ProfileProvider>
  );
}

export default App;
