const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = (req, res) => {
    Post.findById(req.body.post, (err, post) => {
        if(err){
            console.log('Error in finding the post associated with the comment');
            return;
        }
        if(!post){
            console.log('Error in fetching the post: Seems like the postId is invalid');
            return;
        }
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, (err, comment) => {
                // handle error
                if(err){
                    console.log('Error in trying to create the comment');
                    return;
                }
                // save the changes made to the object after updation
                post.comments.push(comment);
                post.save();
                return res.redirect('/');
            });
        }
    });
};