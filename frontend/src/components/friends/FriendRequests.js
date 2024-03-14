import React, { useState, useEffect } from 'react';
import './FriendRequest.css';

const FriendRequests = ({ user, getAccessTokenSilently }) => {
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/friendships/pending-requests/${user.sub}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        
        setPendingRequests(data);
      } else {
        console.error('Failed to fetch pending friend requests.');
      }
    } catch (error) {
      console.error('Error fetching pending friend requests:', error);
    }
  };

  const handleResponse = async (requestId, action) => { // action: 'accept' or 'decline'
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/friendships/${action}-request/${requestId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        
        fetchPendingRequests(); // Refresh the list of pending requests
        alert(`Friend request ${action}ed.`);
      } else {
        console.error(`Failed to ${action} friend request.`);
      }
    } catch (error) {
      console.error(`Error ${action}ing friend request:`, error);
    }
  };
  return (
    <div className="friend-requests-container">
      <h2>Pending Friend Requests</h2>
      {pendingRequests.length > 0 ? (
        pendingRequests.map(request => (
          <div key={request._id} className="friend-request">
            
            <p>
              <a href={`/profile/${request.requester}`} className="requester-nickname">
                {request.requester}
              </a>
            </p>
            <div>
              <button className="accept-button" onClick={() => handleResponse(request._id, 'accept')}>
                Accept
              </button>
              <button className="decline-button" onClick={() => handleResponse(request._id, 'decline')}>
                Decline
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No pending friend requests.</p>
      )}
    </div>
  );
};  

export default FriendRequests;
