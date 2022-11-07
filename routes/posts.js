const express = require('express');

const router = express.Router();

const passport = require('passport');

const newPosts = require('../controllers/postController');

router.post('/create', passport.checkAuthentication,  newPosts.create);

router.get('/destroy/:id', passport.checkAuthentication, newPosts.destroy);

module.exports = router;