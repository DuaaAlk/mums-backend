const express = require("express");
const { fetchPosts, fetchPost } = require("../controllers/post.controllers");
// const passport = require("passport");
// const upload = require("../../middleware/multer");

const router = express.Router();

//middleware
router.param("postId", async (req, res, next, postId) => {
  const post = await fetchPost(postId, next);
  req.post = post;
  next();
});
router.get("/", fetchPosts);

module.exports = router;
