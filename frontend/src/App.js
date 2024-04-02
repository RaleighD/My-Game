import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FeedPage from './pages/FeedPage';
import ProfilePage from './pages/ProfilePage';
import MessagesPage from './pages/MessagesPage';
import SettingsPage from './pages/SettingsPage';
import RegisterPage from './pages/RegisterPage';
import HistoricalStatInputPage from './pages/HistoricalStatInputPage';
import Layout from './components/layout/Layout'; //layout has auth0 and navbar in it
import { ThemeProvider } from './components/layout/ThemeContext'; //used for light/dark mode
import { ProfileProvider } from './components/layout/ProfileContext'
import SearchResultsPage from "./pages/SearchResultsPage"; //used for authing after form submission
import DisplayPostPage from './pages/DisplayPostPage';

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
            <Route path="/historical-stats" element={<HistoricalStatInputPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/search-results" element={<SearchResultsPage />} />
            <Route path="/post/:postId" element={<DisplayPostPage />} />

          </Routes>
        </Layout>
      </ThemeProvider>
    </Router>
    </ProfileProvider>
  );
}

export default App;
