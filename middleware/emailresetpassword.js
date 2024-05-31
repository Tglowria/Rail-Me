const nodemailer = require("nodemailer");
const User = require("../models/user.models");



const emailResetPassword = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_USER,
      pass: process.env.GOOGLE_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.GOOGLE_USER,
    to: email, 
    subject: "Reset Password",
    text: `Welcome, This is your reset token to reset your password. ${token}`,
  };

  await transporter.sendMail(mailOptions);
};

const emailResetPasswordTemplate = async (msg, subject, receiver) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GOOGLE_USER,
      to: receiver,
      subject: subject,
      html: msg,
    };

    await transporter.sendMail(mailOptions);

    return `Message sent' `;
  } catch (err) {
    console.log(err);
    return new customError(500, "Server Error");
  }
};

module.exports = { emailResetPassword, emailResetPasswordTemplate };