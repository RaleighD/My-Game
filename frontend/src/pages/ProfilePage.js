import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const ProfilePage = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [profile, setProfile] = useState(null);
  const { REACT_APP_API_URL } = process.env;
 
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isAuthenticated) {
        const userId = user.sub;
        try {
          const token = await getAccessTokenSilently();
          const response = await fetch(`${REACT_APP_API_URL}/api/users/profile?userId=${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if(response.ok){
            const data = await response.json();
            if (data.success) {
              setProfile(data.user);
            }
          }
          
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      }
    };

    fetchUserProfile();
  }, [user, isAuthenticated, getAccessTokenSilently]);

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  // Render the profile details
  return (
    <div style={{ textAlign: 'center' }}>
      {/* Render user details from profile state */}
      <img src={profile.picture} alt={profile.name} />
      <h2>This is coming from the DB</h2>
      <h2>{profile.email}</h2>
      <h3>{profile.timeZone}</h3>
      <h3>{profile.phoneNumber}</h3>
      
      {/* Continue rendering other profile details */}
    </div>
  );
};

export default ProfilePage;
