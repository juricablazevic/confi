'use strict';
const http = require('http');
const app = require('./app');
const Config = require('./config');
const mongoose = require("mongoose");

mongoose.set('useCreateIndex', true);

mongoose.connect(Config.databaseUrl,
    { useNewUrlParser: true },
    err => {

        if (err) {
            console.error("Failed to connect DB:", err);
            process.exit(1);
        }

        //server config
        const httpServer = http.createServer(app);

        httpServer.listen(Config.port, () =>
            console.log(`http server is running on ${Config.port}`)
        );

    }
)

module.exports = app;