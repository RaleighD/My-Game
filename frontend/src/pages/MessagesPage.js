import React, { useState, useEffect } from 'react';
import './MessagesPage.css';
import { useAuth0 } from "@auth0/auth0-react";

const MessagesPage = () => {
    const [conversations, setConversations] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const [currentConversationId, setCurrentConversationId] = useState(null);
    const { user, isLoading } = useAuth0();

    useEffect(() => {
        if(!isLoading){
            async function fetchUsers() {
                try {
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/users`, {
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` },
                    });
                    if (!response.ok) throw new Error('Network response was not ok.');
                    const { users } = await response.json(); // Destructure users from the response object
                    setUsers(users); // Assuming the backend sends an array of users wrapped in an object
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
            };
        
            async function fetchConversations() {
                try {
                    const convResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/messages/conversations`, {
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` },
                    });
                    const convData = await convResponse.json();
                    console.log("convDATA", convData);
                    setConversations(convData); // Make sure the backend structure matches
                } catch (error) {
                    console.error('Error fetching conversations:', error);
                }
            }
        
            fetchUsers();
            fetchConversations(); 
            
            if (isLoading) {
                return <div>Loading...</div>; // Or any other loading indicator
            }
        }
        
    }, []);
    

    const handleSelectConversation = (conversationId) => {
        setCurrentConversationId(conversationId);
        // Fetch the conversation's messages or set up a real-time listener
    };

    const handleSelectUser = (userId) => {
        console.log(`User ${userId} was clicked.`);
        setSelectedUserIds(selectedUserIds.includes(userId) 
            ? selectedUserIds.filter(id => id !== userId) 
            : [...selectedUserIds, userId]);
    };
    

    const startNewConversation = async () => {
        if (selectedUserIds.length === 0) {
            alert('Please select at least one user to start a conversation.');
            return;
        }
        
        // Assuming currentUserAuth0Id holds the current user's auth0Id
        const participantIds = [...selectedUserIds, user.sub];
    
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages/conversations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` 
                },
                body: JSON.stringify({ participantIds })
            });
            const newConversation = await response.json();
            setConversations([...conversations, newConversation]);
            setSelectedUserIds([]);
        } catch (error) {
            console.error('Error starting a new conversation:', error);
        }
    };
    
    return (
        <div className="messages-page">
            <div className="users-list">
                <h3>Users</h3>
                {users.filter(u => u.auth0Id !== user.sub).map(filteredUser => (
                    <div 
                        key={filteredUser.auth0Id}
                        onClick={() => handleSelectUser(filteredUser.auth0Id)}
                        className={`user-summary ${selectedUserIds.includes(filteredUser.auth0Id) ? 'selected' : ''}`}
                    >
                        {filteredUser.nickname}
                    </div>
                ))}
            </div>
            <div className="conversations-list">
                <h3>Conversations</h3>
                {conversations.map(conversation => (
                    <div 
                        key={conversation._id} // Assuming each conversation has a unique ID
                        onClick={() => handleSelectConversation(conversation._id)}
                        className="conversation-summary"
                    >
                        <p>{conversation.participants.map(p => p.nickname).join(', ')}</p>
                        
                        <p>Last message: {conversation.lastMessage}</p> 
                    </div>
                ))}
                <button onClick={startNewConversation}>New Conversation</button>
            </div>
            <div className="current-conversation">
                {currentConversationId ? (
                    <p>Messages for conversation {currentConversationId} will be displayed here.</p>
                ) : (
                    <p>Select a conversation to view messages, or start a new one.</p>
                )}
            </div>
        </div>
    );
};

export default MessagesPage;
