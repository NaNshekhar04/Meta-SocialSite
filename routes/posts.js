const express = require('express');

const router = express.Router();

const newPosts = require('../controllers/postController')

router.post('/create', newPosts.create);

module.exports = router;