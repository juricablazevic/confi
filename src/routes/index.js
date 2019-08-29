const express = require('express');
const router = express.Router();
const apiRouter = require('../controllers');

router.use('/', apiRouter);

router.all('*', (req, res) => res.sendStatus(404));

module.exports = router;