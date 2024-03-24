const app = require('./server');
const http = require('http');
const { Server } = require('socket.io');
const Message = require('./models/Messages');
const Conversation = require('./models/Messages');

const server = http.createServer(app); 

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", 
        methods: ["GET", "POST"],
    },
});

io.on('connection', (socket) => {
    // Handle new message event
    socket.on('new message', async ({ conversationId, body, senderId }) => {
        try {
            // Create a new message in the database
            const message = await Message.create({
                conversationId,
                body,
                sender: senderId
            });
            
            // Emit the new message to all participants of the conversation
            const conversation = await Conversation.findById(conversationId).populate('participants');
            conversation.participants.forEach(participant => {
                io.to(participant._id.toString()).emit('message', message);
            });
        } catch (error) {
            console.error('Error sending message:', error);
        }
    });
});


const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Use `server.listen` instead of `app.listen`

console.log("Good morning Vietnam!");