const nodemailer = require("nodemailer");
const User = require("../models/user.models");



const emailSender = async ( User) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_USER,
      pass: process.env.GOOGLE_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.GOOGLE_USER,
    to: User.email, 
    subject: "Welcome To Rail-Me Platform",
    text: `Welcome ${User.firstName} to Rail-Me Platform!
      This is your otp: ${User.otp}`,
  };

  await transporter.sendMail(mailOptions);
};

const emailSenderTemplate = async (msg, subject, receiver) => {
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

module.exports = { emailSender, emailSenderTemplate };

exports.sendResetPasswordEmail = async (firstName, email) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Reset Your Password',
        text: `Hi ${firstName}, Your password has been reset successfully.`
    };
    await transporter.sendMail(mailOptions);
};
