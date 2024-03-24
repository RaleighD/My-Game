const app = require('./server');
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app); 

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", 
        methods: ["GET", "POST"],
    },
});

io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

   
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Use `server.listen` instead of `app.listen`

console.log("Good morning Vietnam!");