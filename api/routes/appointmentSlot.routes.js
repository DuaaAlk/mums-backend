const express = require("express");
const {
  fetchAppointmentSlots,
} = require("../controllers/appointmentSlot.controller");

const router = express.Router();

//middlewar
router.get("/", fetchAppointmentSlots);

module.exports = router;
