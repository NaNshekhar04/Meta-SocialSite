const passport = require('passport');

const LocalStrategy  = require('passport-local').Strategy;

const User = require('../models/user')

passport.use(LocalStrategy({
    usernameField : 'email'
},
  function(email, password, done){
        User.findOne({email:email}, function(err, user){
            
        })
  }  
))