const express = require("express");
const passport = require("passport");
const upload = require("../../middleware/multer");
const {
  signup,
  signin,
  createPost,
} = require("../controllers/user.controllers");
const router = express.Router();

router.post("/signup", signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
router.post(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  createPost
);

module.exports = router;
