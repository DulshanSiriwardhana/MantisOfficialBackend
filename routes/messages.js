const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.get('/', async(req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
})

router.post('/', async(req, res) => {
    const message = new Message({
        email: req.body.email,
        message: req.body.message
    })

    try {
        const newMessage = await message.save();
        res.status(201).json(newMessage);
    } catch(error) {
        res.status(400).json({message: error.message});
    }
})

router.get('/:id', async(req, res) => {
    let messageId = req.params.id;
    await Message.findById(messageId).then((message) => {
        res.status(200).send({status: "Message Found", message: message});
    }).catch((error)=>{
        console.log(error.message);
        res.status(500).send({status : "Message not Found",error : error.message});
    })
})

router.delete('/:id', async(req, res) => {
    let messageId = req.params.id;
    await Message.findByIdAndDelete(messageId).then(() => {
        res.status(200).send({status: "Message Deleted"});
    }).catch((error) => {
        console.log(error.message);
        res.status(500).send({status: "Error with delete message"});
    })
})

router.put('/:id', async(req, res) => {
    let messageId = req.params.id;
    const { email, message } = req.body;

    const updatedMessage = {
        email, 
        message 
    }

    try {
        const updatedMessage = await Message.findByIdAndUpdate(messageId, updatedMessage, {new: true});
        if(updatedMessage) {
            res.status(200).json({status: "Message updated", message: updatedMessage});
        } else {
            res.status(400).json({status: "Message not found"});
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({status: "Error with updating the message"});
    }
})

module.exports = router;