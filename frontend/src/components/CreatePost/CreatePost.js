import React, { useState } from 'react';
import axios from 'axios';
import styles from './CreatePost.module.css';

const CreatePost = () => {
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
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('description', description);

            try {
                const url = 'http://localhost:5000/api/posts';
                const response = await axios.post(url, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(response.data);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
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
