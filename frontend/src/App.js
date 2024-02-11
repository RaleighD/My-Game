import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from './components/Layout'; //layout has auth0 and navbar in it

function App() {
  return (
    <Router>
      <Layout> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Define other routes here */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
