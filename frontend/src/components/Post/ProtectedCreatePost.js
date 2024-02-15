import React from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import CreatePost from './CreatePost';

const ProtectedCreatePost = withAuthenticationRequired(CreatePost, {
    onRedirecting: () => <div>Loading...</div>,
});

export default ProtectedCreatePost;
