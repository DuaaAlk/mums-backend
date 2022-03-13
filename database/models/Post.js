const { Schema, model } = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);
PostSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=title%>" });

module.exports = model("Post", PostSchema);
