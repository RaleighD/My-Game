import React, { useState } from 'react';
import axios from 'axios';
import './JoinTeam.css'; 

const JoinTeam = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('name');
  const [teams, setTeams] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/team/search?searchQuery=${searchQuery}&filter=${filter}`);
      setTeams(response.data);
    } catch (error) {
      console.error('Error searching teams:', error);
    }
  };

  const handleJoin = async (teamId) => {
  
  };

  return (
    <div className="join-team-container">
      <h2>Join a Team</h2>
      <p>Search for teams by name, location, or sport. You can join up to 10 teams.</p>
     
    </div>
  );
};

export default JoinTeam;
