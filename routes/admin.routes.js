const express = require('express');
const { uploadPicture, uploadReservation, getAllUsers } = require('../controllers/adminController');

const router = express.Router();

router.put('/picture', uploadPicture );
router.post('/addtrains', uploadReservation );
router.get('/allusers', getAllUsers );

module.exports = router;