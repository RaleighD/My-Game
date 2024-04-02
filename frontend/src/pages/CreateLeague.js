import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useAuth0 } from '@auth0/auth0-react';

const CreateLeague = () => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [leagueName, setLeagueName] = useState('');
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [teams, setTeams] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5001/api/teams')
      .then(response => {
        setTeams(response.data.teams);
      })
      .catch(error => {
        console.error('There was an error fetching the teams:', error);
      });
  }, []);

  const handleLeagueNameChange = (event) => {
    setLeagueName(event.target.value);
  };

  const handleTeamSelection = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedTeams(selectedOptions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }

    const leagueData = {
      name: leagueName,
      organizerAuth0Id: user.sub,
      teamIds: selectedTeams,
    };

    try {
      const response = await axios.post('http://localhost:5001/api/create-league', leagueData, {
        headers: { 'Content-Type': 'application/json' },
      });
      setMessage('League created successfully');
      console.log(response.data);
    } catch (error) {
      setMessage('Error creating league');
      console.error(error);
    }
  };

  return (
    <div className={['create-league-container']}>
      <h2>Create League</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="leagueNameInput">League Name:</label>
          <input type="text" id="leagueNameInput" value={leagueName} onChange={handleLeagueNameChange} required />
        </div>
        <div>
          <label htmlFor="teamsSelect">Select Teams:</label>
          <select multiple={true} value={selectedTeams} onChange={handleTeamSelection} id="teamsSelect" required>
            {teams.map(team => (
              <option key={team._id} value={team._id}>{team.name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Create League</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateLeague;
