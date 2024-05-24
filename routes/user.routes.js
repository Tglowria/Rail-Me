const express = require('express');
const { signup, login, verifyOtp, resendOtp, resetPassword, forgotPassword } = require('../controllers/authController');
const { addBooking, updateBooking, deleteBooking } = require('../controllers/bookingController');
const isAuthenticated = require('../middleware/isAuthenticated');


const router = express.Router();

router.post('/signup', signup );
router.post('/login', login );
router.post('/create', isAuthenticated, addBooking );
router.post('/verifyotp', verifyOtp );
router.post('/resendotp', resendOtp );
router.post('/resetpassword', resetPassword );
router.post('/forgotpassword', forgotPassword );
router.put('/update', isAuthenticated, updateBooking );
router.delete('/delete', isAuthenticated, deleteBooking );

module.exports = router;









module.exports = router;