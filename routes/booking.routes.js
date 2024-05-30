const express = require('express');
const { addBooking, updateBooking, deleteBooking, getAllTrain } = require('../controllers/bookingController');
const isAuthenticated = require('../middleware/isAuthenticated');

const router = express.Router();

router.post('/create/:id', addBooking );
router.put('/update', updateBooking );
router.delete('/delete', deleteBooking );
router.get('/alltrains', getAllTrain );

module.exports = router;