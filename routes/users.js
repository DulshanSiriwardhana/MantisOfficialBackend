const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async(req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
})

router.post('/', async(req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        encryptionKey: req.body.encryptionKey
    })

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch(error) {
        res.status(400).json({message: error.message});
    }
})

router.get('/:id', async(req, res) => {
    let userId = req.params.id;
    await User.findById(userId).then((user) => {
        res.status(200).send({status: "User Found", user: user});
    }).catch((error)=>{
        console.log(error.message);
        res.status(500).send({status : "User not Found",error : error.message});
    })
})

router.delete('/:id', async(req, res) => {
    let userId = req.params.id;
    await User.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status: "User Deleted"});
    }).catch((error) => {
        console.log(error.message);
        res.status(500).send({status: "Error with delete user"});
    })
})

router.put('/:id', async(req, res) => {
    let userId = req.params.id;
    const { name, email, password, encryptionKey } = req.body;

    const updatedUser = {
        name, 
        email, 
        password, 
        encryptionKey
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updatedUser, {new: true});
        if(updatedUser) {
            res.status(200).json({status: "User updated", user: updatedUser});
        } else {
            res.status(400).json({status: "User not found"});
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({status: "Error with updating the user"});
    }
})

router.post('/login', async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.findOne({ email });
        if(user) {
            if (password == user.password) {
                res.status(200).json({ status: "Success", user});
            } else {
                res.status(401).json({ status: "Incorrect password" });
            }
        } else {
            res.status(404).json({ status: "User not found"});
        }
    } catch (error) {
        res.status(500).json({ status: "Error with login"});
    }
})
module.exports = router;