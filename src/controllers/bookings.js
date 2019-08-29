const express = require('express');
const router = express.Router();
const Utils = require("../lib/utils");
const isAdmin = require("../lib/authApi");
const BookingModel = require("../models/booking");
const mongoose = require("mongoose");

router.put('/', async (req, res) => {

    try {

        const {
            firstName,
            lastName,
            email,
            phoneNumber
        } = req.body;

        if (!firstName)
            return Utils.errorResponse(res, "firstName is required");

        if (!lastName)
            return Utils.errorResponse(res, "lastName is required");

        if (!email)
            return Utils.errorResponse(res, "email is required");

        if (!phoneNumber)
            return Utils.errorResponse(res, "phoneNumber is required");

        let booking = await BookingModel.findOne({ email });

        if (!booking)
            booking = await BookingModel.create({
                firstName,
                lastName,
                email,
                phoneNumber
            });

        Utils.successResponse(res, {
            booking
        });

    } catch (err) {
        console.error("error add booking:", err);
        Utils.errorResponse(res, "Failed to add booking");
    }

});

router.get('/', isAdmin, async (req, res) => {

    try {

        const bookings = await BookingModel.find();

        Utils.successResponse(res, {
            bookings
        });

    } catch (err) {
        console.error("error get bookings:", err);
        Utils.errorResponse(res, "Failed to get bookings");
    }

});

router.delete('/:id', isAdmin, async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id))
            return Utils.errorResponse(res, "Invalid id value");

        await BookingModel.deleteOne({ _id: id });

        Utils.successResponse(res);

    } catch (err) {
        console.error("error delete booking:", err);
        Utils.errorResponse(res, "Failed to delete booking");
    }

});

module.exports = router; 