const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;