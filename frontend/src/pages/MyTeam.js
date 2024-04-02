import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import './MyTeam.css';

const MyTeam = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/teams/all');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTeams(data.teams); // Now using the parsed JSON data
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };
  
    fetchTeams();
  }, []);
  

  return (
    <div className="my-team-container">
      <h1>Welcome to My-Team</h1>
      <p>Your teams will display below. You can also create one team and join a maximum of 15 teams.</p>
      
      <div className="teams-list">
        {teams.length > 0 ? (
          teams.map((team) => (
            <div key={team._id} className="team"> 
              <h2>{team.name}</h2>
              <Link to={`/teams/${team._id}`} className="view-team-link">View Team</Link>
            </div>
          ))
        ) : (
          <p>You are not part of any teams yet.</p>
        )}
      </div>

      <hr />

      <div className="team-actions">
        <Link to="/create-team" className="my-team-link">Create Team</Link>
        <Link to="/join-team" className="my-team-link">Join Team</Link>
      </div>
    </div>
  );
}

export default MyTeam;

