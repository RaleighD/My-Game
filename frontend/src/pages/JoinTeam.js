import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import './JoinTeam.css'; 

const JoinTeam = () => {
  const [teams, setTeams] = useState([]);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();


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

  const handleJoin = async (teamId) => {
    try {
      // Check if user is authenticated
      if (!isAuthenticated) {
        console.error('User is not authenticated');
        alert('Please log in to join a team');
        return;
      }
  
      // Fetch user profile to get the MongoDB ObjectId
      const profileResponse = await axios.get(`http://localhost:5001/api/users/profile`, {
        params: { userId: user.sub }
      });
  
      if (profileResponse.data.success && profileResponse.data.user) {
        const userId = profileResponse.data.user._id; // MongoDB ObjectId of the user
  
        // Now, proceed with the join request using the MongoDB ObjectId
        const joinResponse = await axios.post(`http://localhost:5001/api/teams/join`, { teamId, userId });
        alert('Joined team successfully');
        console.log(joinResponse.data); // Optional: Log or handle response data
      } else {
        console.error('Failed to retrieve user profile');
        alert('Failed to join team: User profile not found');
      }
    } catch (error) {
      console.error('Error joining team:', error);
      alert('Failed to join team');
    }
  };
  
  

  return (
    <div className="join-team-container">
      <h2>Join a Team</h2>
      <p>Search for teams by name, location, or sport. You can join up to 10 teams.</p>
      <div className="team-list">
      {teams.map(team => (
        <div key={team._id} className="team">
          <h3>{team.name}</h3>
          <p>Location: {team.location}</p>
          <p>Sport: {team.sport}</p>
          <p>Coach: {team.coach.name}</p>
          <button onClick={() => handleJoin(team._id)}>Join Team</button> {/* Add this line */}
        </div>
      ))}
      </div>
    </div>
  );
};

export default JoinTeam;
