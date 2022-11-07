const Comment  = require('../models/comment');
const Post = require('../models/post');


module.exports.create = function(req, res){

    Post.findById(req.body.post, function(err, post){
        if(post){
            Comment.create = ({
                content: req.body.content,
                post: req.body.post,
                user: req.user_id
            }, function(err, comment){
                if(err){
                    console.log('Nothing')
                }else{
                    post.comment.push(comment);
                    post.save();

                    res.redirect('/'); 
                }
            })
        }
    })
}

module.exports.destroyComment = function(req, res){
    Comment.findById(req.params.id, function(err, comment){
        if(comment.user == req.user.id){
            
            let postId = comment.post;
            comment.remove();

            Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}}, function(err, post){
                return res.redirect('back');
            })
        }else{
            return redirect('back');
        }
    })
}

