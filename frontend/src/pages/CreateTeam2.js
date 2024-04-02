import React, { useState } from 'react';
import axios from 'axios';
import styles from './CreateTeam2.css'; 
import { useAuth0 } from '@auth0/auth0-react';

const CreateTeam = () => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [teamName, setTeamName] = useState('');
  const [location, setLocation] = useState('');
  const [sport, setSport] = useState('');

  const handleTeamNameChange = (event) => {
    setTeamName(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSportChange = (event) => {
    setSport(event.target.value);
  };

  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }
  
    const teamData = {
      name: teamName,
      location,
      sport,
      coachAuth0Id: user.sub, 
    };
  
    try {
      const response = await axios.post('http://localhost:5001/api/teams/create', teamData, {
        headers: { 'Content-Type': 'application/json' },
      });
      setMessage('Team created successfully');
      console.log(response.data);
    } catch (error) {
      setMessage('Error creating team');
      console.error(error);
    }
  };
  
  return (
    <div className={styles['create-team']}>
      <h2>Create Team</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="teamNameInput">Team Name:</label>
          <input type="text" id="teamNameInput" value={teamName} onChange={handleTeamNameChange} required />
        </div>
        <div>
          <label htmlFor="locationInput">Location:</label>
          <input type="text" id="locationInput" value={location} onChange={handleLocationChange} required />
        </div>
        <div>
          <label htmlFor="sportInput">Sport:</label>
          <input type="text" id="sportInput" value={sport} onChange={handleSportChange} required />
        </div>
        <button type="submit">Create Team</button>
      </form>
    </div>
  );
};

export default CreateTeam;


