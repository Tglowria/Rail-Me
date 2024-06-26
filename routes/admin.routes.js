const express = require('express');
const { uploadPicture, uploadReservation, getAllUsers, getTotalBookings, changeUserRoleToAdmin } = require('../controllers/adminController');
const upload = require('../public/image/multer');
const isAuthenticated = require('../middleware/isAuthenticated');


const router = express.Router();

router.put('/picture/:id', isAuthenticated,  upload.single("picture"), uploadPicture );
router.post('/addtrain', isAuthenticated, uploadReservation );
router.put('/changeuser', isAuthenticated, changeUserRoleToAdmin );
router.get('/allusers', isAuthenticated, getAllUsers );
router.get('/allbookings', isAuthenticated,getTotalBookings );

module.exports = router;