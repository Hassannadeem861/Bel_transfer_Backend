const express = require("express");
const isLoggedIn = require("../middleware/auth.js");
const carBookingController = require("../controller/car-booking.controller.js");
const router = express.Router();

router.post("/createData", carBookingController.createCarBooking);
router.get("/get-all-car-bookings", carBookingController.getAllCarBooking);
router.get("/single-car-booking/:id", carBookingController.getSingleCarBooking);
router.put("/update-car-booking/:id", carBookingController.singleUpdateCarBooking);
router.delete("/delete-car-booking/:id", carBookingController.singleDeleteCarBooking);
router.delete("/delete-all-car-bookings", carBookingController.deleteAllCarBookings);

module.exports = router;
