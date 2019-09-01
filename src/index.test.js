'use strict';
const http = require('http');
const app = require('./app');
const mongoose = require("mongoose");
const port = 8081;
const httpServer = http.createServer(app);

mongoose.set('useCreateIndex', true);

mongoose.connect("mongodb://localhost/confitest",
    { useNewUrlParser: true },
    err => {

        if (err) {
            console.error("Failed to connect DB:", err);
            process.exit(1);
        }

        httpServer.listen(port, () => {
            console.log(`http server is running on ${port}\n`);
            httpServer.emit("serverStarted");
        });

    }
)

module.exports = httpServer;