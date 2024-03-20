import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from 'react-router-dom';
import '../App.css';
import FriendRequests from '../components/friends/FriendRequests';
import CurrentFriends from '../components/friends/CurrentFriends';
import './ProfilePage.css';


const ProfilePage = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [profile, setProfile] = useState(null);
  const { userId } = useParams(); // Extract the user ID from the URL
  const [friendRequestStatus, setFriendRequestStatus] = useState('');
  const [baseballStats, setBaseballStats] = useState([]);
  const [basketballStats, setBasketballStats] = useState([]);
  const [footballStats, setFootballStats] = useState([]);
  const [golfStats, setGolfStats] = useState([]);
  const [hockeyStats, setHockeyStats] = useState([]);
  const [soccerStats, setSoccerStats] = useState([]);

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

    const fetchBaseballStats = async () => {
      if (!isAuthenticated || !userId) return;
      try {
          const token = await getAccessTokenSilently();
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/baseball/stats/${userId}`, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
          if (response.ok) {
              const data = await response.json();
              setBaseballStats(data); // Store the fetched data in state
          } else {
              console.error('Failed to fetch baseball stats:', response.statusText);
          }
      } catch (error) {
          console.error('Error fetching baseball stats:', error);
      }
    };

    const fetchBasketballStats = async () => {
      if (!isAuthenticated || !userId) return;
      try {
          const token = await getAccessTokenSilently();
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/basketball/stats/${userId}`, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
          if (response.ok) {
              const data = await response.json();
              setBasketballStats(data); // Store the fetched data in state
          } else {
              console.error('Failed to fetch basketball stats:', response.statusText);
          }
      } catch (error) {
          console.error('Error fetching basketball stats:', error);
      }
    };

    const fetchFootballStats = async () => {
      if (!isAuthenticated || !userId) return;
      try {
          const token = await getAccessTokenSilently();
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/football/stats/${userId}`, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
          if (response.ok) {
              const data = await response.json();
              setFootballStats(data); // Store the fetched data in state
          } else {
              console.error('Failed to fetch football stats:', response.statusText);
          }
      } catch (error) {
          console.error('Error fetching football stats:', error);
      }
    };

    const fetchGolfStats = async () => {
      if (!isAuthenticated || !userId) return;
      try {
          const token = await getAccessTokenSilently();
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/golf/stats/${userId}`, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
          if (response.ok) {
              const data = await response.json();
              setGolfStats(data); // Store the fetched data in state
          } else {
              console.error('Failed to fetch golf stats:', response.statusText);
          }
      } catch (error) {
          console.error('Error fetching golf stats:', error);
      }
    };

    const fetchHockeyStats = async () => {
      if (!isAuthenticated || !userId) return;
      try {
          const token = await getAccessTokenSilently();
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/hockey/stats/${userId}`, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
          if (response.ok) {
              const data = await response.json();
              setHockeyStats(data); // Store the fetched data in state
          } else {
              console.error('Failed to fetch hockey stats:', response.statusText);
          }
      } catch (error) {
          console.error('Error fetching hockey stats:', error);
      }
    };

    const fetchSoccerStats = async () => {
      if (!isAuthenticated || !userId) return;
      try {
          const token = await getAccessTokenSilently();
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/soccer/stats/${userId}`, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
          if (response.ok) {
              const data = await response.json();
              setSoccerStats(data); // Store the fetched data in state
          } else {
              console.error('Failed to fetch soccer stats:', response.statusText);
          }
      } catch (error) {
          console.error('Error fetching soccer stats:', error);
      }
    };
    
    fetchBaseballStats();
    fetchBasketballStats();
    fetchFootballStats();
    fetchGolfStats();
    fetchHockeyStats();
    fetchSoccerStats();
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
    <div>
      <div className="profile-header">
        <img src={profile.picture} alt={`${profile.nickname}'s profile`} style={{ maxWidth: '200px', borderRadius: '50%' }} />
        <h1>{isOwnProfile ? "Your Profile" : `${profile.nickname}'s Profile`}</h1>
      </div>
  
      <div className="friends-section">
        <FriendRequests user={user} getAccessTokenSilently={getAccessTokenSilently} />
        <CurrentFriends userId={userId} getAccessTokenSilently={getAccessTokenSilently} />

      </div>
  
      {isOwnProfile && (
        <div className="center-section">
          <h1>Private Profile</h1>
          <h2>Email: {profile.email}</h2>
          <h3>Timezone: {profile.timeZone}</h3>
          <h3>Phone number: {profile.phoneNumber}</h3>
          {/* Add other profile details here */}
        </div>
      )}

      <div className="baseball-stats-section">
          <h2>Baseball Yearly Stats</h2>
          {baseballStats.length > 0 ? (
              <ul>
                  {baseballStats.map((stat) => (
                      <li key={stat._id}>
                          Year: {stat.year}, Team: {stat.team}, Home Runs: {stat.homeRuns}, Hits: {stat.hits}
                          {/* Display other stats as needed */}
                      </li>
                  ))}
              </ul>
          ) : (
              <p>No baseball stats found.</p>
          )}
      </div>

      <div className="basketball-stats-section">
          <h2>Basketball Yearly Stats</h2>
          {basketballStats.length > 0 ? (
              <ul>
                  {basketballStats.map((stat) => (
                      <li key={stat._id}>
                          Year: {stat.year}, Team: {stat.team}
                      </li>
                  ))}
              </ul>
          ) : (
              <p>No basketball stats found.</p>
          )}
      </div>

      <div className="football-stats-section">
          <h2>Football Yearly Stats</h2>
          {footballStats.length > 0 ? (
              <ul>
                  {footballStats.map((stat) => (
                      <li key={stat._id}>
                          Year: {stat.year}, Team: {stat.team}
                      </li>
                  ))}
              </ul>
          ) : (
              <p>No football stats found.</p>
          )}
      </div>

      <div className="golf-stats-section">
          <h2>Golf Yearly Stats</h2>
          {golfStats.length > 0 ? (
              <ul>
                  {golfStats.map((stat) => (
                      <li key={stat._id}>
                          Year: {stat.year}
                      </li>
                  ))}
              </ul>
          ) : (
              <p>No golf stats found.</p>
          )}
      </div>

      <div className="hockey-stats-section">
          <h2>Hockey Yearly Stats</h2>
          {hockeyStats.length > 0 ? (
              <ul>
                  {hockeyStats.map((stat) => (
                      <li key={stat._id}>
                          Year: {stat.year}, Team: {stat.team}
                      </li>
                  ))}
              </ul>
          ) : (
              <p>No hockey stats found.</p>
          )}
      </div>

      <div className="soccer-stats-section">
          <h2>Soccer Yearly Stats</h2>
          {soccerStats.length > 0 ? (
              <ul>
                  {soccerStats.map((stat) => (
                      <li key={stat._id}>
                          Year: {stat.year}, Team: {stat.team}
                      </li>
                  ))}
              </ul>
          ) : (
              <p>No soccer stats found.</p>
          )}
      </div>
  
      {!isOwnProfile && (
        <div className="center-section">
          {/* Friend Request/Accept Button for Other Users */}
          {friendRequestStatus === 'pending' ? (
            <button disabled style={{ backgroundColor: 'grey' }}>Request Pending...</button>
          ) : friendRequestStatus === 'accepted' ? (
            <button onClick={handleRemoveFriend} style={{ backgroundColor: 'red' }}>Remove Friend</button>
          ) : (
            <button onClick={handleSendFriendRequest}>Send Friend Request</button>
          )}
        </div>
      )}
    </div>
  );
    
};

export default ProfilePage;
