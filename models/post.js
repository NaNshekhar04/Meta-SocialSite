const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    user:{
         // comments belongs to user 
        type: mongoose.Schema.Types.ObjectId ,
        ref: 'User'
        
    },
     // include the array of ids of all comments in this post Schema itself for faster fetching with posts
     comments :[
        {
            type: mongoose.Schema.Types.ObjectId ,
            ref: 'Comment'
        }
     ]
},{
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;