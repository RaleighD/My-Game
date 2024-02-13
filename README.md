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
  - Add the following line: 
    ```
    REACT_APP_API_URL=http://localhost:5001
    ```