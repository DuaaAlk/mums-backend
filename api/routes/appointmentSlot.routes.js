const express = require("express");
const {
  fetchAppointmentSlots,
} = require("../controllers/appointmentSlot.controller");
const passport = require("passport");
const router = express.Router();

//middlewar
router.get(
  "/:consultantId",
  passport.authenticate("jwt", { session: false }),
  fetchAppointmentSlots
);

module.exports = router;
