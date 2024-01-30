import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreatePost from './components/CreatePost/CreatePost';


const App = () => (
    <Router>
        <Routes>
            <Route path="/create-post" element={<CreatePost />} />
            {/* other routes */}
        </Routes>
    </Router>
);

export default App;