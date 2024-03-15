import React from 'react';
import { Link } from 'react-router-dom'; // Make sure to import Link
import './MyTeam.css';

const MyTeam = () => {
  const teams = [];

  return (
    <div className="my-team-container">
      <h1>Welcome to My-Team</h1>
      <p>Your teams will display below. You can also create one team and join a maximum of 15 teams.</p>
      
      <div className="teams-list">
        {teams.length > 0 ? (
          teams.map((team) => (
            <div key={team.id} className="team">
              <h2>{team.name}</h2>
              {/* Assuming you have a method or logic to navigate to a specific team's page */}
              <button onClick={() => {/* navigate to team page logic here */}}>View Team</button>
            </div>
          ))
        ) : (
          <p>You are not part of any teams yet.</p>
        )}
      </div>

      <hr />

      <div className="team-actions">
        <Link to="/create-team" className="my-team-link">Create Team</Link>
        {/* Assuming you will replace the button with a Link or add navigation logic */}
        <button onClick={() => {/* logic to navigate to join team page here */}}>Join Team</button>
      </div>
    </div>
  );
}

export default MyTeam;

