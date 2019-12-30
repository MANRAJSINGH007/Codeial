const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async (req, res) => {
    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id // doubt how is user in req.user????
        });
        return res.redirect('back');
    } catch(err) {
        console.log('Error', err);
        return;
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
                return res.redirect('back');
            } else{
                return res.redirect('back');
            }
        }
    } catch(err) {
        console.log('Error', err);
        return;
    }
};