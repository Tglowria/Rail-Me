const cloudinary = require('../public/image/cloudinary.js');
const User = require('../models/user.models');
const Booking = require('../models/booking.models');
const Train = require('../models/stations.models');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        const totalUsers = await User.countDocuments(); 
        res.status(200).json({message: "All users fetched successfully", totalUsers, users});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.uploadReservation = async (req, res) => {
    const { from, to, coach } = req.body;
    try {
        const newTrain = new Train({ from, to, coach });
        await newTrain.save();
        res.status(201).json({message:"Reservation Created Successfully", newTrain});
    } catch (err) {
        console.error(err.message);
        res.status(500).send({message: "Error uploading reservation", error: err});
    }
};

exports.getTotalBookings = async (req, res) => {
    try {
        const totalBookings = await Booking.countDocuments();
        const bookings = await Booking.find();
        res.status(200).json({ message: "All Bookings fetched Successfully", totalBookings, bookings });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({message:'Error fetching all bookings', err: err});
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
  
      return res.status(200).json({
        message: "Picture Saved Successfully",
        data: updatedTrain,
      });
  
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error Uploading Picture", error: err });
    }
  };

  exports.changeUserRoleToAdmin = async (req, res) => {
    try {
        const { userId } = req.body; 
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.role = 'admin';
        await user.save();

        res.status(200).json({ message: 'User role updated to admin successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


 