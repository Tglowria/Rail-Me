const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    coach: {
        type: String,
        required: true,
        enum: [ 'First Class', 'Business', 'Economy']
    },
    from: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    seatNo: {
        type: Number,
        required: true,
        isBooked: Boolean, default: false
    }
},
{
    versionKey: false,
    _id: true
});


const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;