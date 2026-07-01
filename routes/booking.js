const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middleware");
const wrapAsync = require("../utils/wrapAsync");

const bookingController = require("../controllers/bookings");

// =======================
// Test Route (Optional)
// =======================
router.get("/test", (req, res) => {
    res.send("Booking Route Working");
});

// =======================
// My Bookings
// =======================
router.get(
    "/my",
    isLoggedIn,
    wrapAsync(bookingController.myBookings)
);

// =======================
// Create Booking
// =======================
router.post(
    "/:id",
    isLoggedIn,
    wrapAsync(bookingController.createBooking)
);

// =======================
// Accept Booking
// =======================
router.put(
    "/:bookingId/accept",
    isLoggedIn,
    wrapAsync(bookingController.acceptBooking)
);

// =======================
// Reject Booking
// =======================
router.put(
    "/:bookingId/reject",
    isLoggedIn,
    wrapAsync(bookingController.rejectBooking)
);

// =======================
// Cancel Booking
// =======================
router.delete(
    "/:bookingId",
    isLoggedIn,
    wrapAsync(bookingController.cancelBooking)
);

module.exports = router;