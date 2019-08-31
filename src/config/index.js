'use strict';
module.exports = {
    port: 8080,
    databaseUrl: "mongodb://localhost/confi",
    admin: {
        username: "admin",
        password: "password"
    },
    email: {
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "testtestic37@gmail.com",
            pass: "Password1."
        },
        from: 'testtestic37@gmail.com'
    }
};