const User = require("../../database/models/User");
const bcrypt = require("bcrypt");
const { JWT_EXPIRATION_MS } = require("../../config/keys");
const { JWT_SECRET } = require("../../config/keys");
const jwt = require("jsonwebtoken");

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
