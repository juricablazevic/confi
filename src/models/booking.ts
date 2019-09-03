import mongoose from 'mongoose';

// Defining a schema
const schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    confirmationCode: {
        type: String,
        required: true
    }
});

export = mongoose.model("booking", schema);