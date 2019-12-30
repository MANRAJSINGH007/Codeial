const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = (req, res) => {
    Post.create({
        content: req.body.content,
        user: req.user._id // doubt how is user in req.user????
    }, function(err, post){
        if(err){
            console.log('Error in creating a post');
            return;
        }
        return res.redirect('back');
    });
};


module.exports.destroy = (req, res) => {
    Post.findById(req.params.id, (err, post) => {
        if(err){
            console.log('Error in fetching the ppost from the db');
            return;
        }
        if(!post){
            console.log('Error: The post does not exist in the db');
            return;
        } else{
            // .id means converting the objectId into string
            // can write post.user == req.user._id
            if(post.user == req.user.id){
                post.remove();
                Comment.deleteMany({post: req.params.id}, (err) => {
                    return res.redirect('back');
                });
            } else{
                return res.redirect('back');
            }
        }
    });
};