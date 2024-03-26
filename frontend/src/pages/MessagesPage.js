import React, { useState, useEffect } from 'react';
import './MessagesPage.css';
import { useAuth0 } from "@auth0/auth0-react";

const MessagesPage = () => {
    const [conversations, setConversations] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const [currentConversationId, setCurrentConversationId] = useState(null);
    const { user, isLoading } = useAuth0();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');


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
        
    }, [isLoading]);
    

    const handleSelectConversation = async (conversationId) => {
        setCurrentConversationId(conversationId);
        
        console.log("Curr messages:", messages);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages/${conversationId}/messages`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const data = await response.json();
            console.log("Message data:", data);
            setMessages(data); 
        } catch (error) {
            console.error('Error fetching messages:', error);
            setMessages([]); 
        }
        
        
    };
    

    const handleSelectUser = (userId) => {
        console.log(`User ${userId} was clicked.`);
        console.log('Current conversations:', conversations);
        setSelectedUserIds(selectedUserIds.includes(userId) 
            ? selectedUserIds.filter(id => id !== userId) 
            : [...selectedUserIds, userId]);
    };
    

    const startNewConversation = async () => {
        if (selectedUserIds.length === 0) {
            alert('Please select at least one user to start a conversation.');
            return;
        }
    
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
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const responseText = await response.text();
            try {
                const newConversation = JSON.parse(responseText);
                setConversations([...conversations, newConversation]);
                setSelectedUserIds([]);
            } catch (e) {
                console.error("Error parsing JSON:", e);
                console.log("Received response:", responseText);
            }
        } catch (error) {
            console.error('Error starting a new conversation:', error);
        }
    };
    
    const sendMessage = async (conversationId, body) => {
        if (!body.trim()) return; // Prevent sending empty messages
    
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/api/messages/${conversationId}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                },
                body: JSON.stringify({ body })
            });
    
            // Clear the message input after sending
            setNewMessage('');
    
            // Optionally, fetch the updated list of messages here
            handleSelectConversation(conversationId);
        } catch (error) {
            console.error('Error sending message:', error);
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
                        <p>{conversation.participants.join(', ')}</p>
                        
                        <p>Last message: {conversation.lastMessage}</p> 
                    </div>
                ))}
                <button onClick={startNewConversation}>New Conversation</button>
            </div>
            <div className="current-conversation">
                {currentConversationId ? (
                    <div>
                        <h4>Messages</h4>
                        <div className="messages-container">
                            {messages.map((message, index) => (
                                <div key={index} className="message">
                                    <div className="message-header">
                                        <img src={message.sender.picture} className="profile-picture"/>
                                        <a href={`/profile/${message.sender.auth0Id}`} className="profile-link">{message.sender.nickname}</a>
                                        <p className="message-timestamp">{new Date(message.createdAt).toLocaleString()}</p>
                                    </div>
                                    <p>{message.body}</p>
                                    
                                </div>
                            ))}
                        </div>
                        <div className="message-input-container">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button onClick={() => sendMessage(currentConversationId, newMessage)}>Send</button>
                        </div>
                    </div>
                ) : (
                    <p>Select a conversation to view messages, or start a new one.</p>
                )}
            </div>
        </div>
    );
};

export default MessagesPage;
