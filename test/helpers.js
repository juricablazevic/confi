'use strict';
const server = require("../src/index.test");
const request = require("supertest").agent(server);

before(done =>
    server.on("serverStarted", done)
);

after(done => {
    done();
    process.exit(1);
});

global.request = request;
global.apiAuth = "Basic YWRtaW46cGFzc3dvcmQ=";