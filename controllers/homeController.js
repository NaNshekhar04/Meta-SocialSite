const Post = require('../models/post');

module.exports.home = function(req, res){

    // Post.find({}, function(err, posts){
    //     res.render('home',{
    //         title: "Meta | Home",
    //         posts: posts
    //     });
    // })
    // Populate the user for each post
    Post.find({}).populate('user').exec(function(err, posts){
        res.render('home',{
            title: "Meta | Home",
            posts: posts
        });
    })

    }