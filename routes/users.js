const express = require('express');
const router = express.Router();
const passport = require('passport');


const userController = require('../controllers/userController');

router.get('/profile', passport.checkAuthentication,userController.profile)

router.get('/signup', userController.signUp)

router.get('/signin', userController.signIn )


//Using for passport
router.post('/create', userController.create);

router.post('/create-session', 
passport.authenticate('local', {failureRedirect: '/users/signIn'},),
userController.createSession);

router.get('/signout', userController.destroySession);

module.exports = router;