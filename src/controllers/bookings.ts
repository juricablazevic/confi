import { Router } from 'express';
import Utils from "../lib/utils";
import isAdmin from "../lib/authApi";
import BookingModel from "../models/booking";
import mongoose from "mongoose";
import Const from "../lib/consts";

const router = Router();

router.put('/', async (req, res) => {

    try {

        const {
            firstName = "",
            lastName = "",
            email = "",
            phoneNumber = ""
        }: {
            firstName: string,
            lastName: string,
            email: string,
            phoneNumber: string
        } = req.body;

        if (!firstName)
            return Utils.errorResponse(res, Const.addBookingError.noFirstName);

        if (!lastName)
            return Utils.errorResponse(res, Const.addBookingError.noLastName);

        if (!email)
            return Utils.errorResponse(res, Const.addBookingError.noEmail);

        if (!phoneNumber)
            return Utils.errorResponse(res, Const.addBookingError.noPhoneNumber);

        const confirmationCode = Utils.generateCode();

        let booking = await BookingModel.findOneAndUpdate(
            { email },
            { ...req.body, confirmationCode },
            { new: true }
        );

        if (!booking)
            booking = await BookingModel.create({ ...req.body, confirmationCode });

        // i do not want await sendMail because api will execute longer,
        // so it will be executed asynchronously
        Utils.sendMail({
            to: email,
            subject: 'Conference confirmation code',
            text: `Your confirmation code: ${confirmationCode}`
        }).catch(err => console.error("send email err:", err));

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
            return Utils.errorResponse(res, Const.deleteBookingError.invalidId);

        await BookingModel.deleteOne({ _id: id });

        Utils.successResponse(res);

    } catch (err) {
        console.error("error delete booking:", err);
        Utils.errorResponse(res, "Failed to delete booking");
    }

});

export = router; 