const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function(req, res){

    // Post.find({}, function(err, posts){
    //     res.render('home',{
    //         title: "Meta | Home",
    //         posts: posts
    //     });
    // })
    // Populate the user for each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate:'user'
    })
    .exec(function(err, posts){
    
        res.render('home',{
            title: "Meta | Home",
            posts: posts
        });
    })

    }