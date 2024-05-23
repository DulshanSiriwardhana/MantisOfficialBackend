const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    encryptionKey: {
        type: String,
        required: false,
        default: null
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;