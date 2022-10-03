const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

router.get('/profile', userController.profile)

router.get('/signup', userController.signup)

router.get('/signin', userController.signIn )
 
router.post('/create', userController.create);

router.post('/create-session', userController.createSession);       ///users/users/create-session

module.exports = router;


