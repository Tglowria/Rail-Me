const express = require('express');
const { addBooking, updateBooking, deleteBooking, getAllTrain } = require('../controllers/bookingController');
const isAuthenticated = require('../middleware/isAuthenticated');

const router = express.Router();

router.post('/create/:id', isAuthenticated,addBooking );
router.put('/update/:bookingId', isAuthenticated,updateBooking );
router.delete('/delete/:bookingId', isAuthenticated,deleteBooking );
router.get('/alltrains', isAuthenticated, getAllTrain );

module.exports = router;