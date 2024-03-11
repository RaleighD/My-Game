import React, { useState, useEffect } from 'react';
import './CurrentFriends.css';

const CurrentFriends = ({ user, getAccessTokenSilently }) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    fetchFriendsList();
  }, []);

  const fetchFriendsList = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/friendships/friends/${user.sub}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFriends(data);
      } else {
        console.error('Failed to fetch friends list.');
      }
    } catch (error) {
      console.error('Error fetching friends list:', error);
    }
  };
  console.log("friends", friends);
  return (
    <div className="friends-list">
      <h2>Current Friends</h2>
      {friends.length > 0 ? (
        friends.map((friend) => (
          <div key={friend.friendId} className="friend-entry">
           
            <a href={`/profile/${friend.sub}`}>{friend.nickname}</a>
          </div>
        ))
      ) : (
        <p>You have no friends.</p>
      )}
    </div>
  );
};

export default CurrentFriends;
