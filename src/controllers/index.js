const express = require('express');
const router = express.Router();

router.use('/bookings', require('./bookings'));

module.exports = router;