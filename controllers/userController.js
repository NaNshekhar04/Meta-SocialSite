const User = require('../models/user');

module.exports.profile = function (req, res) {
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
                if(user){
                   return res.render('userProfile', {
                        title: 'Page',
                        user: user
                    })
                }
                return res.redirect('/users/signup');
        });      
    }else{
        return res.redirect('/users/signup');
    }
}

module.exports.signup = function (req, res) {
    res.render('SignUp', {
        title: 'SignUp'
    })
}

module.exports.signIn = function (req, res) {
   return res.render('SignIn', {
        title: 'SignIn'
    })
}

// POST ACTIONS FOR CREATING USER 

// getting the signUp data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.Confirm_password) {
        console.log('here');
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log('Error in finding the user');
            return;
        }
        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { console.log('Error in Creating the user'); return }
                return res.redirect('/users/signin');
            })
        }
        else {
            return res.redirect('back');
        }
    });

}


// 
//getting the signIn data for the session
module.exports.createSession = function(req, res){
    // find the User in DB 
    User.findOne({email:req.body.email}, function(err, user){
        if (err) { console.log('Error in Signing the user'); return }

    // Handle User Found
    if(user){

        if(user.password != req.body.password){
            return res.redirect('back');
        }

        res.cookie('user_id', user.id);
           return res.redirect('/users/profile');
    }
    else{
        return res.redirect('back');
    }
    })
}

