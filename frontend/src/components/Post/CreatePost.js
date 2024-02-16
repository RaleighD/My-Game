import React, { useState } from 'react';
import axios from 'axios';
import styles from './CreatePost.module.css';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import { storage, auth } from '../../Firebase'; 
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";




const CreatePost = () => {
    const { user, isAuthenticated, loginWithRedirect } = useAuth0(); //only signed in users can make posts
    //could use user to get author of post, which we will prob need
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!isAuthenticated) {
            loginWithRedirect();
            return;
        }
    
        if (file) {
            // Create a storage reference in Firebase
            const fileRef = ref(storage, `posts/${file.name}`);
            const uploadTask = uploadBytesResumable(fileRef, file);
    
            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Optionally, handle upload progress (e.g., with a progress bar)
                },
                (error) => {
                    // Handle unsuccessful uploads
                    console.error('Upload failed:', error);
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        console.log('File available at', downloadURL);
                        // Here, send the post metadata along with the downloadURL to your server
                        try {
                            const url = `${process.env.REACT_APP_API_URL}/api/posts`; 
                            const response = await axios.post(url, {
                                imageUrl: downloadURL,
                                description,
                                user: user.sub // Assuming you want to send the user ID
                            }, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    // Include authorization headers as needed
                                },
                            });
                            console.log(response.data);
                            
                        } catch (error) {
                            console.error('Error saving post metadata:', error);
                        }
                    });
                }
            );
        }
    };
    

    return (
        <div className={styles['create-post']}>
            <h2>Create Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="fileInput">File:</label>
                    <input type="file" id="fileInput" onChange={handleFileChange} />
                </div>
                <div>
                    <label htmlFor="descriptionInput">Description:</label>
                    <textarea
                        id="descriptionInput"
                        value={description}
                        onChange={handleDescriptionChange}
                    ></textarea>
                </div>
                <button type="submit">Create Post</button>
            </form>
        </div>
    );
};

export default CreatePost;
