import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from 'react-router-dom';
import '../App.css';
import FriendRequests from '../components/friends/FriendRequests';
import CurrentFriends from '../components/friends/CurrentFriends';


const ProfilePage = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [profile, setProfile] = useState(null);
  const { userId } = useParams(); // Extract the user ID from the URL
  const [friendRequestStatus, setFriendRequestStatus] = useState('');



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
    fetchFriendRequestStatus();
    
  }, [userId, isAuthenticated, getAccessTokenSilently]);

  const handleSendFriendRequest = async () => {
    try {
      const token = await getAccessTokenSilently();
      await fetch(`${process.env.REACT_APP_API_URL}/api/friendships/send-friend-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          requester: user.sub, // Auth0 user ID of the requester
          recipient: userId, // The user ID of the profile being viewed
        }),
      }).then(response => {
        if (response.ok) {
          fetchFriendRequestStatus(); // Update the button after sending the request
          alert('Friend request sent successfully!');

        } else {
          alert('Failed to send friend request.');
        }
      });
    } catch (error) {
      console.error('Error sending friend request:', error);
      alert('Error sending friend request.');
    }
  };

  //needed for displaying the button AFTER sending a request
  const fetchFriendRequestStatus = async () => {
    if (!user || !userId) return;
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/friendships/request-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          requester: user.sub,
          recipient: userId,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        // Use the status from the response
        if (data.exists) {
          setFriendRequestStatus(data.status); // This will be 'pending', 'accepted', etc.
        } else {
          setFriendRequestStatus(''); // No request exists
        }
      } else {
        console.error('Failed to fetch friend request status');
      }
    } catch (error) {
      console.error('Error fetching friend request status:', error);
    }
  };
  
  
  //remove friend route
  const handleRemoveFriend = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/friendships/remove-friend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          requester: user.sub, // Corrected from userSub to requester
          recipient: userId, // Corrected from friendId to recipient
        }),
      });
  
      if (response.ok) {
        setFriendRequestStatus('');
        alert('Friend removed successfully.');
      } else {
        const errorResponse = await response.json();
        alert(`Failed to remove friend. Server says: ${errorResponse.message}`);
      }
    } catch (error) {
      console.error('Error removing friend:', error);
      alert('Error removing friend.');
    }
  };
  


  if (!profile) {
    return <div>Loading profile...</div>;
  }

  // Check if the logged-in user is viewing their own profile
  const isOwnProfile = user?.sub === userId;

  return (
    <div style={{ textAlign: 'center' }}>
      <img src={profile.picture} alt={`${profile.nickname}'s profile`} style={{ maxWidth: '200px', borderRadius: '50%' }} />
      <h1>{isOwnProfile ? "Your Profile" : `${profile.nickname}'s Profile`}</h1>
  
      {isOwnProfile ? (
        <>
          <FriendRequests user={user} getAccessTokenSilently={getAccessTokenSilently} />
          <CurrentFriends user={user} getAccessTokenSilently={getAccessTokenSilently} />
  
          <h1>Private Profile</h1>
          <h2>Email: {profile.email}</h2>
          <h3>Timezone: {profile.timeZone}</h3>
          <h3>Phone number: {profile.phoneNumber}</h3>
        </>
      ) : friendRequestStatus === 'pending' ? (
        <button disabled style={{ backgroundColor: 'grey' }}>Request Pending...</button>
      ) : friendRequestStatus === 'accepted' ? (
        <button onClick={handleRemoveFriend} style={{ backgroundColor: 'red' }}>Remove Friend</button>
      ) : (
        <button onClick={handleSendFriendRequest}>Send Friend Request</button>
      )}
    </div>
  );
  
  
  
  
  
};

export default ProfilePage;
