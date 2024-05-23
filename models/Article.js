const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String
    },
    video: {
        type: String
    },
    document: {
        type: String
    }
});

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;