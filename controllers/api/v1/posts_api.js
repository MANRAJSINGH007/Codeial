const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async (req, res) => {

    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

    return res.status(200).json({
        message: "Lists of Posts",
        posts: posts
    });
};

module.exports.destroy = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);
        post.remove();
        await Comment.deleteMany({post: req.params.id});
        return res.status(200).json({
            message: "Post and associated comments deleted successfully"
        });
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};