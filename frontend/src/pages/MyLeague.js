import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 

const MyLeague = () => {
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/leagues/myleagues');
        setLeagues(response.data.leagues); 
      } catch (error) {
        console.error('Error fetching leagues:', error);
      }
    };

    fetchLeagues();
  }, []);

  return (
    <div className="my-league-container">
      <h1>Welcome to My League</h1>
      <p>Your leagues will display below. You can create or join leagues.</p>
      
      <div className="leagues-list">
        {leagues.length > 0 ? (
          leagues.map((league) => (
            <div key={league._id} className="league">
              <h2>{league.name}</h2>
              <Link to={`/leagues/${league._id}`} className="view-league-link">View League</Link>
            </div>
          ))
        ) : (
          <p>You are not part of any leagues yet.</p>
        )}
      </div>

      <hr />

      <div className="league-actions">
        <Link to="/create-league" className="my-league-link">Create League</Link>
        <Link to="/join-league" className="my-league-link">Join League</Link>
      </div>
    </div>
  );
}

export default MyLeague;
