const Post = require('../models/post');

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