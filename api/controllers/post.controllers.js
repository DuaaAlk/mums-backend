const Post = require("../../database/models/Post");

exports.fetchPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

exports.fetchPost = async (postId, next) => {
  try {
    const post = await Post.findById(postId);
    console.log("This is controller:", post);
    if (post) return post;
    else {
      const err = new Error("Post not found");
      err.status = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};
