const express = require('express');
const { uploadPicture, uploadReservation, getAllUsers, getTotalBookings, changeUserRoleToAdmin } = require('../controllers/adminController');
const upload = require('../public/image/multer');
const isAuthenticated = require('../middleware/isAuthenticated');
const { isAdmin } = require('../middleware/isAdmin');

const router = express.Router();

router.put('/picture/:id',isAdmin, isAuthenticated,  upload.single("picture"), uploadPicture );
router.post('/addtrain', isAdmin, isAuthenticated, uploadReservation );
router.put('/changeuser', isAdmin, isAuthenticated, changeUserRoleToAdmin );
router.get('/allusers', isAdmin, isAuthenticated, getAllUsers );
router.get('/allbookings', isAdmin, isAuthenticated,getTotalBookings );

module.exports = router;