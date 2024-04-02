import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react'; // Import useAuth0 hook
import './JoinTeam.css';

const JoinTeam = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/teams/all');
        setTeams(response.data.teams);
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError('Failed to fetch teams. Please try again later.');
      }
    };

    fetchTeams();
  }, []);

  // Function to handle team join request
  const joinTeam = async (teamId) => {
    if (!isAuthenticated) {
      setError('You must be logged in to join a team.');
      return;
    }

    try {
      const token = await getAccessTokenSilently();
      // Fetch the user's MongoDB Object ID using their user.sub
      const userResponse = await axios.get(`http://localhost:5001/api/users/profile?userId=${user.sub}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userId = userResponse.data.user._id;

      // Use the fetched user ID to join the team
      await axios.post(`http://localhost:5001/api/teams/join`, {
        userId, // Use the MongoDB Object ID
        teamId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle success (e.g., update state, show a message)
    } catch (err) {
      console.error('Error joining team:', err);
      setError('Failed to join the team. Please try again later.');
    }
  };

  return (
    <div className="join-team-container">
      <h2>Join a Team</h2>
      <p>Search for teams by name, location, or sport. You can join up to 10 teams.</p>
      <div className="teams-list">
        {teams.length > 0 ? (
          teams.map((team) => (
            <div key={team._id} className="team">
              <h3>{team.name}</h3>
              {/* Replace Link with button and add onClick handler */}
              <button onClick={() => joinTeam(team._id)} className="join-team-button">Join Team</button>
            </div>
          ))
        ) : (
          <p>No teams found.</p>
        )}
      </div>
    </div>
  );
};

export default JoinTeam;

