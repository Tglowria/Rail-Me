const cloudinary = reruire('../public/image/cloudinary.js')
const User = require('../models/user.models');
const Booking = require('../models/booking.models');
const Train = require('../models/stations.models');

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

exports.uploadPicture = async (req, res) => {
    try {
      // Find the train by ID
      const train = await Train.findById(req.params.id);
      if (!train) {
        return res.status(400).json({ message: "Train not found" });
      }
  
      // Upload the picture to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
  
      // Update the train with the new image URL
      const updatedTrain = await Train.findByIdAndUpdate(
        req.params.id,
        { image: result.secure_url },
        { new: true } // 'new' returns the updated document
      );
  
      // Send a success response
      return res.status(200).json({
        message: "Picture Saved Successfully",
        data: updatedTrain,
      });
  
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error Uploading Picture", error: err });
    }
  };