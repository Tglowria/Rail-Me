const mongoose = require("mongoose");
const User = require("../models/user.models");
const Booking = require("../models/booking.models");
const Train = require("../models/stations.models");

exports.addBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const { coach, from, destination, seatNo } = req.body;
    if (!coach || !from || !destination || !seatNo) {
      return res
        .status(400)
        .json({ message: "Please input all required fields!" });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newBooking = new Booking({
      coach,
      from,
      destination,
      seatNo,
      userId: id,
    });

    const booking = await newBooking.save();
    return res
      .status(201)
      .json({
        message: "Your Train Seat has been booked Successfully",
        booking,
      });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error Creating a booking", err });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const { coach, from, destination, seatNo } = req.body;

    // Validate input
    if (!coach || !from || !destination || !seatNo) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields!" });
    }

    // Find and update the booking
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        coach,
        from,
        destination,
        seatNo,
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Booking updated successfully", updatedBooking });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error updating booking", error: err.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const findBooking = await Booking.findById(bookingId);
    if (!findBooking) {
      return res.status(400).json({ message: "The Booking Does Not Exist" });
    }

    // Find and delete the booking
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

    return res
      .status(200)
      .json({ message: "Booking deleted successfully", deletedBooking });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error deleting booking", error: err.message });
  }
};

exports.getAllTrain = async (req, res) => {
  try {
    const train = await Train.find();
    res.status(200).json(train);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
