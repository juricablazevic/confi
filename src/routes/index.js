'use strict';
const express = require('express');
const router = express.Router();
const apiRouter = require('../controllers');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');

router.use('/api', apiRouter);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.all('*', (req, res) => res.sendStatus(404));

module.exports = router;