const { Schema, model } = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const TimeSlot = new Schema(
  {
    slot: { type: String, required: true },
    price: { type: Number, required: true },
    available: { type: Boolean, default: true, required: true },
  },
  {
    timestamps: true,
  }
);
TimeSlot.plugin(mongooseSlugPlugin, { tmpl: "<%=date>" });

module.exports = model("TimeSlot", TimeSlot);
