const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

router.get('/', async(req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
})

router.post('/', async(req, res) => {
    const article = new Article({
        name: req.body.name,
        cover: req.body.cover,
        description: req.body.description,
        link: req.body.link,
        video: req.body.video,
        document: req.body.document
    })

    try {
        const newArticle = await article.save();
        res.status(201).json(newArticle);
    } catch(error) {
        res.status(400).json({message: error.message});
    }
})

router.get('/:id', async(req, res) => {
    let articleId = req.params.id;
    await Article.findById(articleId).then((article) => {
        res.status(200).send({status: "Article Found", article: article});
    }).catch((error)=>{
        console.log(error.message);
        res.status(500).send({status : "Article not Found",error : error.message});
    })
})

router.delete('/:id', async(req, res) => {
    let articleId = req.params.id;
    await Article.findByIdAndDelete(articleId).then(() => {
        res.status(200).send({status: "Article Deleted"});
    }).catch((error) => {
        console.log(error.message);
        res.status(500).send({status: "Error with delete article"});
    })
})

router.put('/:id', async(req, res) => {
    let articleId = req.params.id;
    const { name, cover, description, link, video, document } = req.body;

    const updatedArticle = {
        name,
        cover,
        description,
        link,
        video,
        document
    }

    try {
        const updatedArticle = await Article.findByIdAndUpdate(articleId, updatedArticle, {new: true});
        if(updatedArticle) {
            res.status(200).json({status: "Article updated", article: updatedArticle});
        } else {
            res.status(400).json({status: "Article not found"});
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({status: "Error with updating the article"});
    }
})

module.exports = router;