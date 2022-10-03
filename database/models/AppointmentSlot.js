const { Schema, model } = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const AppointmentSlot = new Schema(
  {
    consutant: { type: Schema.Types.ObjectId, ref: "User" },
    dateTime: { type: Date, required: true, unique: true },
    duration: { type: String, required: true },
    price: { type: Number, required: true },
    available: { type: Boolean, default: true, required: true },
  },
  {
    timestamps: true,
  }
);
AppointmentSlot.plugin(mongooseSlugPlugin, { tmpl: "<%=date>" });

module.exports = model("AppointmentSlot", AppointmentSlot);
