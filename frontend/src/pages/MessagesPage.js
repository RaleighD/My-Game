import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MessagesPage.css';

const MessagesPage = () => {
    const [conversations, setConversations] = useState([]);
    const [currentConversationId, setCurrentConversationId] = useState(null);

    useEffect(() => {
        // Placeholder for fetching conversations from your backend
        // This might look something like: fetchConversations().then(setConversations);
        // For now, we'll use a static list
        setConversations([
            { id: '1', participants: 'User A, User B', lastMessage: 'Hey there!' },
            { id: '2', participants: 'User C, User D', lastMessage: 'How are you?' },
        ]);
    }, []);

    const handleSelectConversation = (conversationId) => {
        setCurrentConversationId(conversationId);
        // Here you would also fetch the conversation's messages or set up a real-time listener
    };

    return (
        <div className="messages-page">
        
            <div className="conversations-list">
                <h3>Conversations</h3>
                {conversations.map(conversation => (
                    <div 
                        key={conversation.id} 
                        onClick={() => handleSelectConversation(conversation.id)}
                        className="conversation-summary"
                    >
                        <p>{conversation.participants}</p>
                        <p>Last message: {conversation.lastMessage}</p>
                    </div>
                ))}
                <button onClick={() => console.log('Start a new conversation')}>New Conversation</button>
            </div>
            <div className="current-conversation">
                {/* Placeholder for selected conversation messages */}
                {currentConversationId ? (
                    <p>Messages for conversation {currentConversationId} will be displayed here.</p>
                ) : (
                    <p>Select a conversation to view messages.</p>
                )}
            </div>
        </div>
    );
};

export default MessagesPage;
