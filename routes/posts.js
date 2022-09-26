const express = require('express');

const router = express.Router();

const newPosts = require('../controllers/postController')

router.get('/newPosts', newPosts.posts);

module.exports = router;