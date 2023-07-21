const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
    lawyerId: {
        type: String,
        required: true,
    },
    clientId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },

    details: {
        type: String,
        required: true,
    },

    rescheduled: {
        type: Boolean,
        default: false,
    },
    isResolved: {
        type: Boolean,
        default: false,
    },
    time: {
        type: String,
        required: true,
    }

}, { versionKey: false });

const AppointmentModel = mongoose.model("appointment", appointmentSchema);

module.exports = { AppointmentModel };
