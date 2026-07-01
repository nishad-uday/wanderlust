const Listing = require("../models/listing");
// Index

module.exports.index = async (req, res) => {

    let filter = {};

    if (req.query.search) {

        filter.$or = [
            {
                title: {
                    $regex: req.query.search,
                    $options: "i",
                },
            },
            {
                location: {
                    $regex: req.query.search,
                    $options: "i",
                },
            },
            {
                country: {
                    $regex: req.query.search,
                    $options: "i",
                },
            },
            {
                category: {
                    $regex: req.query.search,
                    $options: "i",
                },
            },
        ];
    }

    if (req.query.category) {
        filter.category = req.query.category;
    }

    const allListings = await Listing.find(filter);

    res.render("listings/index.ejs", { allListings });
};


// New Listing Form

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

// Show Listing

module.exports.showListing = async (req, res) => {

    let { id } = req.params;

    const listing = await Listing.findById(id)

        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })

        .populate("owner")

        .populate({
            path: "bookings",
            populate: {
                path: "user",
            },
        });

    if (!listing) {
        req.flash(
            "error",
            "Listing You requested for does not exist!"
        );
        return res.redirect("/listings");
    }

    res.render("listings/show.ejs", { listing });
};


// Create Listing

module.exports.createListing = async (req, res) => {

    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);

    newListing.owner = req.user._id;

    newListing.image = {
        url,
        filename,
    };

    await newListing.save();

    req.flash("success", "New Listing Created!");

    res.redirect("/listings");
};

// ==============================
// Edit Form
// ==============================
module.exports.renderEditForm = async (req, res) => {

    let { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {

        req.flash(
            "error",
            "Listing You requested for does not exist!"
        );

        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;

    originalImageUrl = originalImageUrl.replace(
        "/upload",
        "/upload/h_250,w_250"
    );

    res.render("listings/edit.ejs", {
        listing,
        originalImageUrl,
    });

};

// ==============================
// Update Listing
// ==============================
module.exports.updateListing = async (req, res) => {

    let { id } = req.params;

    let listing = await Listing.findByIdAndUpdate(
        id,
        {
            ...req.body.listing,
        }
    );

    if (typeof req.file !== "undefined") {

        let url = req.file.path;
        let filename = req.file.filename;

        listing.image = {
            url,
            filename,
        };

        await listing.save();
    }

    req.flash("success", "Listing Updated!");

    res.redirect(`/listings/${id}`);
};

// ==============================
// Delete Listing
// ==============================
module.exports.destroyListing = async (req, res) => {

    let { id } = req.params;

    await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing Deleted!");

    res.redirect("/listings");
};