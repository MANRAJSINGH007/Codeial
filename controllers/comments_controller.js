const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = (req, res) => {
    Post.findById(req.body.post, (err, post) => {
        if(err){
            req.flash('error', 'Error in finding the post associated with the comment');
            return;
        }
        if(!post){
            req.flash('error', 'Error in fetching the post: Seems like the postId is invalid');
            return res.redirect('back');
        }
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, (err, comment) => {
                // handle error
                if(err){
                    req.flash('error', 'Error in trying to create the comment');
                    return;
                }
                // save the changes made to the object after updation
                post.comments.push(comment);
                post.save();
                req.flash('success', 'Comment Added Successfully');
                return res.redirect('/');
            });
        }
    });
};

module.exports.destroy = (req, res) => {
    Comment.findById(req.params.id, (err, comment) => {
        if(err) {
            req.flash('error', 'Error in connecting with the Comment DB');
            return;
        }
        if(!comment) {
            req.flash('error', 'Error in finding the comment: seems like it does not exists');
            return res.redirect('back');
        } else {
            if(comment.user == req.user.id) {
                let postId = comment.post;
                comment.remove();
                // finds the post by the postId and updates the array of comments associated with it by removing the comment id
                Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, function(err, post) {
                    req.flash('success', 'Comment Removed Successfully');
                    return res.redirect('back');
                });
            } else {
                req.flash('error', 'You are not authorized to delete the comment');
                return res.redirect('back');
            }
        }
    });
};