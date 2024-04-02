import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CreatePost from '../components/Post/CreatePost';
import Modal from '../components/modal/Modal';
import PostCard from '../components/Post/PostCard';
import { useAuth0 } from "@auth0/auth0-react";
import { getAuth, signInWithCustomToken } from 'firebase/auth';


const FeedPage = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [posts, setPosts] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const { REACT_APP_API_URL } = process.env;
    
    
    const afterPostCreated = () => {
        handleCloseModal(); // Close the modal
        fetchPosts(); // Refresh the posts
      };

    useEffect(() => {
        const checkUserProfileCompletion = async () => {
            if (!isAuthenticated) return;
        
            try {
                
                //check to make sure currUser has completed their profile
                const response = await fetch(`${REACT_APP_API_URL}/api/users/check`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        
                    },
                    body: JSON.stringify({ userId: user.sub }),
                });
                const data = await response.json();
                
                if (!data.isComplete) {
                    navigate('/register');
                } else {
                    if (data.firebaseToken) {
                        const auth = getAuth();
                        signInWithCustomToken(auth, data.firebaseToken)
                            .then(() => {
                                fetchPosts();
                            })
                            .catch((firebaseError) => {
                                console.error('Firebase authentication failed:', firebaseError);
                            });
                    }
                    localStorage.setItem('jwtToken', data.token); //store jwt to browser
                }
            } catch (error) {
                console.error('Error checking user profile completion:', error);
            }
        };
    
        checkUserProfileCompletion();
    }, [isAuthenticated, user?.sub, getAccessTokenSilently, navigate]);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`${REACT_APP_API_URL}/api/posts/feed`);
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleLike = async (postId) => {
        try {
            const response = await axios.put(`${REACT_APP_API_URL}/api/posts/${postId}/like`, {
                userId: user.sub 
            }, {
                headers: { Authorization: `Bearer ${await getAccessTokenSilently()}` },
            });
            fetchPosts();
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };
    

    const handleAddComment = async (postId, commentText) => {
        try {
            await axios.post(`${REACT_APP_API_URL}/api/posts/${postId}/comment`, 
                { text: commentText, userId: user.sub, nickname: user.nickname}, 
                { headers: { Authorization: `Bearer ${await getAccessTokenSilently()}` } }
            );
            fetchPosts();
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const onDelete = async (postId) => {
        const token = localStorage.getItem('jwtToken');
        try {
            await axios.delete(`${REACT_APP_API_URL}/api/posts/${postId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchPosts(); 
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const onUpdate = async (postId, updatedDesc) => {
        const token = localStorage.getItem('jwtToken');
        try {
            await axios.patch(`${REACT_APP_API_URL}/api/posts/${postId}`, {
                description: updatedDesc, // Make sure this value is defined
                requester: user.sub, // Assuming 'user.sub' is correctly defined and holds the user's ID
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchPosts();
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };
    


    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    return (
        <div>
            <button onClick={handleOpenModal}>Create Post</button>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <CreatePost afterPostCreated={afterPostCreated}/>
            </Modal>
            <div>
                {posts.map(post => (
                    <PostCard
                    key={post._id}
                    post={post}
                    currentUserId={user.sub}
                    onLike={() => handleLike(post._id)}
                    onAddComment={handleAddComment}
                    onDelete={() => onDelete(post._id)} 
                    onUpdate={onUpdate}
                />
                
                ))}
            </div>
        </div>
    );
   
    
};



export default FeedPage;
