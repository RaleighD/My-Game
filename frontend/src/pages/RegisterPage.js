import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './RegisterPage.css';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../components/layout/ProfileContext';

const RegisterPage = () => {
  const { profileComplete, setProfileComplete } = useProfile();
  const navigate = useNavigate();
  const { user, getAccessTokenSilently } = useAuth0();
  const [formData, setFormData] = useState({
    email: user?.email || '',
    displayName: user?.nickname || '',
    picture: user?.picture || '',
    firstName: user?.given_name || '',
    lastName: user?.family_name || '',
    phoneNumber: user?.phone_number || '',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  useEffect(() => {
    if (profileComplete) {
      navigate('/feed');
    }
  }, [profileComplete, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = await getAccessTokenSilently();

    fetch(`${process.env.REACT_APP_API_URL}/api/users/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: user.sub,
        ...formData,
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      setProfileComplete(true);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="register-form-container">
      {Object.keys(formData).map((key) => {
        if (key === 'picture') return null; // Skip rendering the picture field entirely

        // Determine if the field should be disabled
        const isDisabled = ['email', 'timeZone'].includes(key);

        return (
          <div key={key} className="form-field">
            <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:</label>
            <input
              id={key}
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              disabled={isDisabled}
            />
          </div>
        );
      })}
      <button type="submit" className='submit-btn'>Submit</button>
    </form>
  );
};

export default RegisterPage;
