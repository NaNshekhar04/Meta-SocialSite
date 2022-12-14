const passport = require('passport');

const LocalStrategy  = require('passport-local').Strategy;

const User = require('../models/user')

passport.use(new LocalStrategy({
    usernameField : 'email'
},
  function(email, password, done){
    User.findOne({email:email}, function(err, user){
      if(err){
        console.log('Errorin finding the user -- > Passport');
        return done;
      }
      if(!user || user.password != password){
        console.log('Invalid Username or Password');
        return done(err, false);
      }
      return done(null, user);
        });
  }  
));


//serializing the user to decide which key is to be kept into the cookie

passport.serializeUser(function(user, done){
  return done(null, user.id);             //This user id is encrypted using passport session!
})

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    if(err){
      console.log('Error in finding the User')
    }

    return done(null, user);
  })
})

//check if the user is authenticated
passport.checkAuthentication =  function(req, res, next){
  //if the user is signed in then pass on the request to the next function(controller's action)
  if(req.isAuthenticated()){
    return next();
  }
  //if the user is not signed in
  return res.redirect('/users/signin');
}


passport.setAuthenticatedUser = function(req, res, next){
  if(req.isAuthenticated()){
    res.locals.user = req.user;
  }
  next();
}


module.exports = passport;