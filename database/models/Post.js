const { Schema, model } = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const PostSchema = new Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    image: String,
    description: String,
    price: {
      type: Number,
      default: 1,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);
PostSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });

module.exports = model("Post", PostSchema);
