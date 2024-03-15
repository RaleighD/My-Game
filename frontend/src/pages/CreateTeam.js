import React, { useState } from 'react';
import axios from 'axios';
import styles from './CreateTeam.css'; 
import { useAuth0 } from '@auth0/auth0-react';

const CreateTeam = () => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [teamName, setTeamName] = useState('');
  const [location, setLocation] = useState('');
  const [sport, setSport] = useState('');
  const [picture, setPicture] = useState(null);

  const handleTeamNameChange = (event) => {
    setTeamName(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSportChange = (event) => {
    setSport(event.target.value);
  };

  const handlePictureChange = (event) => {
    setPicture(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }

    const formData = new FormData();
    formData.append('name', teamName);
    formData.append('location', location);
    formData.append('sport', sport);
    formData.append('coach', user.sub); 
    if (picture) {
      formData.append('picture', picture);
    }

    try {
      const response = await axios.post('http://localhost:5001/api/team/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Team created successfully:', response.data);
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  return (
    <div className={styles['create-team']}>
      <h2>Create Team</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
        <div>
          <label htmlFor="pictureInput">Team Picture:</label>
          <input type="file" id="pictureInput" name="picture" onChange={handlePictureChange} />
        </div>
        <button type="submit">Create Team</button>
      </form>
    </div>
  );
};

export default CreateTeam;
