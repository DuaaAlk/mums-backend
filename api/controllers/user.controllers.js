const User = require("../../database/models/User");
const bcrypt = require("bcrypt");
const { JWT_EXPIRATION_MS, JWT_SECRET } = require("../../config/keys");
const jwt = require("jsonwebtoken");
const Post = require("../../database/models/Post");

exports.signup = async (req, res, next) => {
  try {
    const { password } = req.body;
    req.body.password = await bcrypt.hash(password, 10);
    const newUser = await User.create(req.body);
    const token = this.generateToken(newUser);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.generateToken = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};

exports.signin = (req, res) => {
  const token = this.generateToken(req.user);
  res.status(201).json({ token });
};

exports.createPost = async (req, res, next) => {
  try {
    req.body.createdBy = req.user._id;
    if (req.file) {
      req.body.image = `${req.file.path}`;
      req.body.image = req.body.image.replacce("\\", "/");
    }
    const createdPost = await Post.create(req.body);
    res.status(201).json({
      msg: "Post is created successfully",
      payload: createdPost,
    });
  } catch (error) {
    next(error);
  }
};
