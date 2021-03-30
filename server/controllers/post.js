const express = require('express');
const router = express.Router();

const Post = require('../models/Post');

router.get('/', async (req, res) => {
    try {
        const posts = await Post.all
        res.json(posts)
    } catch (err) {
        res.status(500).send({ err })
    }
})

router.post('/', async (req, res) => {
    try {
        const posts = await Post.create(req.body)
        res.json(posts)
    } catch (err) {
        res.status(500).send({ err })
    }
})

router.get('/:unique_id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.unique_id)
        res.json(post)
    } catch (err) {
        res.status(500).send({ err })
    }
})

module.exports = router