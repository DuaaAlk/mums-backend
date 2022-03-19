const { Schema, model, mongoose } = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const Appointment = new Schema({
  client: { type: Schema.Types.ObjectId, ref: "User" }, // same as what i export
  appointments: [
    { appointment: { type: Schema.Types.ObjectId, ref: "AppointmentSlot" } },
  ],
});
Appointment.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });

module.exports = model("Appointment", Appointment);
