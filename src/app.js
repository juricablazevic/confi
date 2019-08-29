const express = require('express');
const router = require('./routes');
const bodyParser = require('body-parser');

//express config
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

module.exports = app;
