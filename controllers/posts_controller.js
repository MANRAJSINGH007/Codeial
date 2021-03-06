const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async (req, res) => {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id // doubt how is user in req.user????
        });

        if(req.xhr) {
            // return some json
            return res.status(200).json({
                data: {
                    post: post,
                    user: {
                        name: req.user.name
                    }
                },
                message: 'Post craeted'
            });
        }

        req.flash('success', 'Post published!');
        return res.redirect('back');
    } catch(err) {
        req.flash('error', err);
        return res.redirect('back');
    }
};


module.exports.destroy = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);
        if(!post){
            console.log('Error: The post does not exist in the db');
            return;
        } else{
            // .id means converting the objectId into string
            // can write post.user == req.user._id
            if(post.user == req.user.id){
                post.remove();
                await Comment.deleteMany({post: req.params.id});
                if(req.xhr) {
                    return res.status(200).json({
                        data: {
                            post_id: req.params.id
                        },
                        message: "Post Deleted"
                    });
                }
                req.flash('success', 'Post associated comments delted');
                return res.redirect('back');
            } else{
                req.flash('error', 'Error: You cannot delete this post');
                return res.redirect('back');
            }
        }
    } catch(err) {
        req.flash('error', err);
        return res.redirect('back');
    }
};