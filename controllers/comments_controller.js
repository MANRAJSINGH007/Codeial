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

module.exports.destroy = (req, res) => {
    Comment.findById(req.params.id, (err, comment) => {
        if(err) {
            console.log('Error in connecting with the Comment DB');
            return;
        }
        if(!comment) {
            console.log('Error in finding the comment: seems like it does not exists');
            return;
        } else {
            if(comment.user == req.user.id) {
                let postId = comment.post;
                comment.remove();
                // finds the post by the postId and updates the array of comments associated with it by removing the comment id
                Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, function(err, post) {
                    return res.redirect('back');
                });
            } else {
                console.log('You are not authorized to delete the comment');
                return res.redirect('back');
            }
        }
    });
};