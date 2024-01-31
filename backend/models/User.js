const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
    // Add more fields as necessary
});

const User = mongoose.model('User', userSchema);

module.exports = User;