import http from 'http';
import app from './app';
import mongoose from "mongoose";

const port = 8081;
const httpServer = http.createServer(app);

mongoose.connect("mongodb://localhost/confitest", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}, err => {

    if (err) {
        console.error("Failed to connect DB:", err);
        process.exit(1);
    }

    httpServer.listen(port, () => {
        console.log(`http server is running on ${port}\n`);
        httpServer.emit("serverStarted");
    });

});

export = httpServer;