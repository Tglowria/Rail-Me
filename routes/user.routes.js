const express = require('express');
const { signup, login, verifyOtp, resendOtp, resetPassword, forgotPassword } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup );
router.post('/login', login );
router.post('/verifyotp', verifyOtp );
router.post('/resendotp', resendOtp );
router.post('/reset/:token', resetPassword );
router.post('/forgotpassword', forgotPassword );


module.exports = router;









module.exports = router;