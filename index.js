const mongodb = require('mongodb');
const { ClientEncryption } = require('mongodb-client-encryption');
const { MongoClient } = require('mongodb');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const app = express();

app.use(cors({
    origin: ["http://localhost:3000",
            "http://localhost:3001",
            "https://drive.google.com/file/d/",
            "https://mantisofficial.vercel.app/",
            "https://mantisofficial.vercel.app",
            "https://mantis-official-admin.vercel.app/",
            "https://mantis-official-admin.vercel.app",
            "https://mantisofficialfrontend.onrender.com",
            "https://mantisofficialfrontend.onrender.com/",
            "https://mantisofficialadmin.onrender.com"]
}));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(error => console.log(error));

const usersRouter = require('./routes/users');
const articleRouter = require('./routes/articles');
const messageRouter = require('./routes/messages')

app.use('/users', usersRouter);
app.use('/articles', articleRouter);
app.use('/messages', messageRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is up and running on the port ${PORT}`);
});