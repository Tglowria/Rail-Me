const User = require("../models/user.models");
const Booking = require("../models/booking.models");

exports.addBooking = async (req, res) => {
    try {
      const id = req.params.id;
      const { coach, from, destination, seatNo } = req.body;
      if (!coach || !from || !destination ||!seatNo) {
        return res
          .status(400)
          .json({ message: "Please input all required fields!" });
      }
      const newBooking = new Booking({
        coach,
        from,
        destination,
        seatNo,
        userId: id,
      });
      const user = await User.findById(id);
      const booking = await newBooking.save();
      return res
        .status(201)
        .json({ booking, message: "Your Train Seat has been booked Successfully"});
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
            return res.status(400).json({ message: "Please provide all required fields!" });
        }

        // Find and update the booking
        const updatedBooking = await Booking.findByIdAndUpdate(bookingId, {
            coach,
            from,
            destination,
            seatNo,
        }, { new: true });

        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        return res.status(200).json({ booking: updatedBooking, message: "Booking updated successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error updating booking", error: err.message });
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const bookingId = req.params.bookingId;

        // Find and delete the booking
        const deletedBooking = await Booking.findByIdAndDelete(bookingId);

        if (!deletedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        return res.status(200).json({ message: "Booking deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error deleting booking", error: err.message });
    }
};

exports.getServices = async (req, res) => {
    try {
        const trains = await Train.find();
        res.status(200).json(trains);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};