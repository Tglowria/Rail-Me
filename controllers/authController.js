const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require("uuid");
const User = require("../models/user.models.js");
const { emailSender } = require('../middleware/emailotp.js');  
const { emailResetPassword } = require("../middleware/emailresetpassword.js");
const { sendSms } = require("../middleware/smsotp.js");



exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, password, email, phoneNumber } = req.body;

        // Check if all required fields are provided
        if (!firstName || !lastName || !email || !password || !phoneNumber) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }
        // Validate password format
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
            });
        }

        // Check if user with provided email already exists
        const existingUser = await User.findOne({ email });
        console.log(existingUser);

        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000);

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = new User({
            firstName,
            lastName,
            password: hashedPassword,
            email,
            phoneNumber,
            otp,
        });
console.log(newUser);
        // Save new user to database
        await newUser.save();

        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send OTP email
        await emailSender(newUser);
        await sendSms(newUser);

        return res.status(201).json({ message: "User saved successfully", token, newUser });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error saving user", error: err.message });
    }
};



exports.verifyOtp = async (req, res) => {
  try {
    const otp = req.body.otp;

    if (!otp) {
      return res.status(400).json({ message: "Please Input Your Otp" });
    }

    const user = await User.findOne({ otp: otp });

    if (!user) {
      return res.status(400).json({ message: "User With That OTP Not Found" });
    }

    const otpCreationTime = user.otpCreatedAt;
    const currentTime = Date.now();
    const otpValidityPeriod = 10 * 60 * 1000;

    if (currentTime - otpCreationTime > otpValidityPeriod) {
      return res.status(400).json({ message: "OTP has expired" });
    }
    
    user.isVerified = true;
    user.otp = null;
    

    return res.status(200).json({ message: "OTP Verified Successfully", user });
  } catch (err) {
    console.error(err);

    return res.status(500).json({ message: "Error Verifying Otp" });
  }
};


  exports.resendOtp = async (req, res) => {
    try {
      const { email } = req.body;
  
      if (!email) {
        return res.status(400).json({ message: "Please provide an email" });
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res
          .status(400)
          .json({ message: "User with that email not found" });
      }
  
      // Generate new OTP
      const otp = Math.floor(100000 + Math.random() * 900000);
      const otpCreationTime = Date.now(); // Store the creation time of OTP
  
      // Update user with new OTP and creation time
      user.otp = otp;
      user.otpCreatedAt = otpCreationTime;
      user.isVerified = false; // Reset verification status
  
      await user.save();
      
      
      await emailSender(user);

      
      return res.status(200).json({ message: "OTP resent successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error resending OTP", err });
    }
  };
  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Please input your email and password" });
      }
  
      // Find The User By Email In The Database
      const user = await User.findOne({ email });
  
      // If You're Not A User, Sign Up
      if (!user) {
        return res.status(404).json({ message: "User Not Found, Please Signup" });
      }
  
      const correctPassword = await bcrypt.compare(password, user.password);
      if (!correctPassword) {
        return res.status(400).json({ message: "Incorrect Password" });
      }
  
  
      return res
        .status(200)
        .json({ message: "User Logged In Succesfully", user });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error Logging In User", err });
    }
  };
  
  exports.forgotPassword = async (req,res) => {
    try {
    const {email} = req.body;
      if(!email) {
        return res.status(400).json({ message: "Please Input Your Email" });
  
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }
  
      const token = uuidv4();
  
      user.resetToken = token;
      user.save();
     
      await emailResetPassword(email, token);

      return res
        .status(200)
        .json({ message: "Check Your Mail To Reset Your Password", user });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error saving user", err });
    }
  }

  exports.resetPassword = async (req, res) =>{
    try {
      const token = req.params.token;
      const {newPassword, confirmPassword} = req.body
      if(!token) {
        return res.status(400).json({ message: "Please Input Your Reset Token" });
      }
      if(newPassword !== confirmPassword) {
        return res.status(400).json({ message: "Password Does Not Match" });
  
      }

  const hashPassword = await bcrypt.hash(newPassword, 10)
  user.password = hashPassword;
  
  await user.save();

        async (err, data) => {
          await emailSenderTemplate(data, "Password Reset Succesfully!", user.email);
        }
  
  return res
        .status(200)
        .json({ message: "Password Reset successfully", user });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error Reseting Password", err });
    }
  };

