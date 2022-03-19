const { Schema, model } = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const AppointmentSlot = new Schema(
  {
    consutant: { type: Schema.Types.ObjectId, ref: "User" },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    date: Date,
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
AppointmentSlot.plugin(mongooseSlugPlugin, { tmpl: "<%=date>" });

module.exports = model("AppointmentSlot", AppointmentSlot);
