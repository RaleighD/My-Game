import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import './MyTeam2.css';
import { useAuth0 } from '@auth0/auth0-react'; // Import useAuth0 hook

const MyTeam = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0(); // Use the useAuth0 hook to get user details and auth status
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      if (!isAuthenticated) {
        console.error('User must be logged in to fetch teams');
        return;
      }
  
      try {
        const token = await getAccessTokenSilently();
        // Adjust the URL to use the new /allMyTeams endpoint
        const response = await axios.get('http://localhost:5001/api/teams/allMyTeams', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            userId: user.sub, // Send the Auth0 user ID as a parameter
          },
        });
        setTeams(response.data.teams);
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError('Failed to fetch teams. Please try again later.');
      }
    };
  
    fetchTeams();
  }, [isAuthenticated, getAccessTokenSilently, user?.sub]);

  return (
    <div className="my-team-container">
      <h1>Welcome to My-Team</h1>
      <p>Your teams will display below. You can also create one team and join a maximum of 15 teams.</p>
      {error && <p className="error">{error}</p>}
      
      <div className="teams-list">
        {teams.length > 0 ? (
          teams.map((team) => (
            <div key={team._id} className="team"> 
              <h2>{team.name}</h2>
              <Link to={`/teams/${team.name}`} className="view-team-link">View Team</Link>
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
