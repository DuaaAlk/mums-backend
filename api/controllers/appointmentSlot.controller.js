const AppointmentSlot = require("../../database/models/AppointmentSlot");
const User = require("../../database/models/User");

exports.fetchAppointmentSlots = async (req, res, next) => {
  try {
    const appointmentSlots = await AppointmentSlot.find();
    res.json(appointmentSlots);
  } catch (error) {
    next(error);
  }
};
