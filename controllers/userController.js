const User = require('../models/user');


module.exports.profile = function(req, res){
    return res.render('userProfile', {
        title: 'User Profile'
    })
}


// render the sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){      //if already authenticated stay at profile
        return res.redirect('/users/profile');
    }
    return res.render('SignUp', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){      //if already authenticated stay at profile
       return res.redirect('/users/profile');
    }
    return res.render('signIn', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.Confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/signin');
            })
        }else{
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/users/profile');
}

module.exports.destroySession = function(req, res){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
    }






//         req.logout; 
//         return res.redirect('/');
