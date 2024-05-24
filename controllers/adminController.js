const User = require('../models/User');
const Booking = require('../models/Booking');
const Train = require('../models/Train');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.uploadReservation = async (req, res) => {
    const { from, to, coach, image } = req.body;
    try {
        const newTrain = new Train({ from, to, coach, image });
        await newTrain.save();
        res.status(201).json(newTrain);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getTotalBookings = async (req, res) => {
    try {
        const totalBookings = await Booking.countDocuments();
        res.status(200).json({ totalBookings });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
