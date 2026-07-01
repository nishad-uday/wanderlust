const Booking = require("../models/booking");
const Listing = require("../models/listing");

// Create Booking
module.exports.createBooking = async (req, res) => {

    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    // Date Validation

    const checkIn = new Date(req.body.checkIn);
    const checkOut = new Date(req.body.checkOut);

    if (checkOut <= checkIn) {
        req.flash(
            "error",
            "Check-Out date must be after Check-In date."
        );
        return res.redirect(`/listings/${id}`);
    }

    // Guests Validation

    const guests = Number(req.body.guests);

    if (guests < 1 || guests > 20) {
        req.flash(
            "error",
            "Guests must be between 1 and 20."
        );
        return res.redirect(`/listings/${id}`);
    }


    // Double Booking Validation

    const existingBooking = await Booking.findOne({
        listing: listing._id,
        checkIn: { $lt: checkOut },
        checkOut: { $gt: checkIn }
    });

    if (existingBooking) {
        req.flash(
            "error",
            "This listing is already booked for the selected dates."
        );
        return res.redirect(`/listings/${id}`);
    }

    // Create Booking

    const booking = new Booking({
        listing: listing._id,
        user: req.user._id,
        checkIn,
        checkOut,
        guests,
    });

    // Save Booking
    await booking.save();

    // Save Booking ID inside Listing
    await Listing.findByIdAndUpdate(
        listing._id,
        {
            $push: {
                bookings: booking._id,
            },
        }
    );

    req.flash("success", "Booking Successful!");

    res.redirect(`/listings/${id}`);
};

// My Bookings

module.exports.myBookings = async (req, res) => {

    const bookings = await Booking.find({
        user: req.user._id,
    }).populate("listing");

    res.render("bookings/index.ejs", {
        bookings,
    });

};

// Cancel Booking

module.exports.cancelBooking = async (req, res) => {

    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
        req.flash("error", "Booking not found!");
        return res.redirect("/bookings/my");
    }

    await Listing.findByIdAndUpdate(
        booking.listing,
        {
            $pull: {
                bookings: booking._id,
            },
        }
    );

    await Booking.findByIdAndDelete(bookingId);

    req.flash("success", "Booking Cancelled Successfully!");

    res.redirect("/bookings/my");
};



// Accept Booking

module.exports.acceptBooking = async (req, res) => {

    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
        req.flash("error", "Booking not found!");
        return res.redirect("/bookings/my");
    }

    booking.status = "Confirmed";

    await booking.save();

    req.flash("success", "Booking Confirmed!");

    res.redirect(`/listings/${booking.listing}`);
};


// Reject Booking
module.exports.rejectBooking = async (req, res) => {

    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
        req.flash("error", "Booking not found!");
        return res.redirect("/bookings/my");
    }

    booking.status = "Rejected";

    await booking.save();

    req.flash("success", "Booking Rejected!");

    res.redirect(`/listings/${booking.listing}`);
};

    