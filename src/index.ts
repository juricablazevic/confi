import http from 'http';
import app from './app';
import Config from './config/index';
import mongoose from "mongoose";

mongoose.connect(Config.databaseUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}, err => {

    if (err) {
        console.error("Failed to connect DB:", err);
        process.exit(1);
    }

    //server config
    const httpServer: http.Server = http.createServer(app);

    httpServer.listen(Config.port, () =>
        console.log(`http server is running on ${Config.port}`)
    );

});