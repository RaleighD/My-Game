import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from 'react-router-dom';
import '../App.css';

const ProfilePage = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [profile, setProfile] = useState(null);
  const { userId } = useParams(); // Extract the user ID from the URL

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isAuthenticated && userId) {
        try {
          const token = await getAccessTokenSilently();
          // Use the userId from the URL to fetch the corresponding profile
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/profile?userId=${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setProfile(data.user);
          } else {
            console.error('Failed to fetch profile:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      }
    };

    fetchUserProfile();
  }, [userId, isAuthenticated, getAccessTokenSilently]);

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  // Check if the logged-in user is viewing their own profile
  const isOwnProfile = user?.sub === userId;
  console.log("picture url: ", profile.picture);
  return (
    <div style={{ textAlign: 'center' }}>
      <img src={profile.picture} alt={`${profile.nickname}'s profile`} style={{ maxWidth: '200px', borderRadius: '50%' }} />
      <h1>{isOwnProfile ? "Your Profile" : `${profile.nickname}'s Profile`}</h1>
      
      
      {/* Conditionally render profile information */}
      {isOwnProfile ? (
        // Display private information for the logged-in user's own profile
        <>
          <h1>Private Profile</h1>
          <h2>Email: {profile.email}</h2>
          <h3>Timezone: {profile.timeZone}</h3>
          <h3>Phone number: {profile.phoneNumber}</h3>
          {/* Add any other private information or controls relevant to the user's own profile */}
        </>
      ) : (
        // Display limited or public information for other users' profiles
        <>
          <button >Send Friend Request</button>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
