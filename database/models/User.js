const { Schema, model, mongoose } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
    },
    firstName: String,
    lastName: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("user", UserSchema); //same "user" if i want to use as foriegn key
