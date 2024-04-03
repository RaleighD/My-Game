import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const TeamDetails = () => {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { teamId } = useParams(); // Extracting teamId from URL parameters

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/teams/${teamId}`);
        setTeam(response.data); // Now you're setting the entire team object, which includes members
      } catch (err) {
        console.error('Error fetching team details:', err);
        setError('Failed to fetch team details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeamDetails();
  }, [teamId]);

  if (loading) {
    return <div>Loading team details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!team) {
    return <div>Team not found</div>;
  }

  return (
    <div>
      <h1>Team: {team.name}</h1>
      <h2>Members</h2>
      {team.members && team.members.length > 0 ? (
        <ul>
          {team.members.map((member) => (
            <li key={member._id}>
              <Link to={`/profile/${member.auth0Id}`}>
              {member.nickname}</Link>
              ({member.email})

            </li>
          ))}
        </ul>
      ) : (
        <p>No members found.</p>
      )}
    </div>
  );
};

export default TeamDetails;
