# My-Game

## Your life starts now.

### Set up

#### Server

- **Navigate to 'backend' in your terminal.**
  - Run `npm install` to install node modules required for the project.

- **Create a `.env` file within the backend directory.**
  - Add the following line and update `USERNAME` and `PASSWORD` with your Mongo Atlas project associated user/pass: 
    ```
    MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@mygame.bscgfip.mongodb.net/?retryWrites=true&w=majority
    ```

- **To start the server, run `npm start`.** Runs on port 5001. Why? Who knows. Ask Rocko.

#### Frontend

- **Navigate to 'frontend' in your terminal.**
  - Run `npm install` to install node modules required for the project.

- **Create a `.env.local` file within the frontend directory.**
  - Add the following lines: 
    ```
    REACT_APP_AUTH0_DOMAIN=your-auth0-domain
    REACT_APP_AUTH0_CLIENT_ID=your-auth0-client
    REACT_APP_API_URL=http://localhost:5001
    REACT_APP_FIREBASE_API_KEY=your-api-key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
    REACT_APP_FIREBASE_PROJECT_ID=your-project-id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
    REACT_APP_FIREBASE_APP_ID=your-app-id
    REACT_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id
    ```
