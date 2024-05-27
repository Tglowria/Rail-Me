const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    otpCreatedAt: {
        type: Date,
        default: Date.now(),
        required: true,
      },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true,
    }

},
{
    versionKey: false,
    // _id: true,
});

const User = mongoose.model("User", userSchema);

module.exports = User;