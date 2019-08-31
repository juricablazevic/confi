'use strict';
const expect = require('chai').expect;
const fetch = require('node-fetch');
const Const = require("../src/lib/consts")

describe('Bookings API routes', function () {

    describe('GET /bookings', function () {

        it('missing authorization header', async function () {

            try {

                const response = await fetch("http://localhost:8080/bookings")
                    .then(res => res.json());

                expect(response).have.property("error").equal(true);
                expect(response).have.property("msg").equal(Const.authorizationError.invalid);

            } catch (err) {
                throw err;
            }

        });

        it('invalid authorization', async function () {

            try {

                const response = await fetch("http://localhost:8080/bookings", {
                    headers: { 'Authorization': "test" },
                }).then(res => res.json());

                expect(response).have.property("error").equal(true);
                expect(response).have.property("msg").equal(Const.authorizationError.invalid);

            } catch (err) {
                throw err;
            }

        });

        it('returns a list of bookings', async function () {

            try {

                const response = await fetch("http://localhost:8080/bookings", {
                    headers: { 'Authorization': global.apiAuth },
                }).then(res => res.json());

                expect(response).have.property("data").to.be.an("object");
                expect(response.data).have.property("bookings").to.be.an("array");

            } catch (err) {
                throw err;
            }

        });

    });

    describe('PUT /bookings', function () {

        it('no first name', async function () {

            try {

                const response = await fetch("http://localhost:8080/bookings", {
                    method: "PUT"
                }).then(res => res.json());

                expect(response).have.property("error").equal(true);
                expect(response).have.property("msg").equal(Const.addBookingError.noFirstName);

            } catch (err) {
                throw err;
            }

        });

        it('no last name', async function () {

            try {

                const response = await fetch("http://localhost:8080/bookings", {
                    method: "PUT",
                    body: JSON.stringify({
                        firstName: "test"
                    }),
                    headers: { 'Content-Type': 'application/json' }
                }).then(res => res.json());

                expect(response).have.property("error").equal(true);
                expect(response).have.property("msg").equal(Const.addBookingError.noLastName);

            } catch (err) {
                throw err;
            }

        });

        it('no email', async function () {

            try {

                const response = await fetch("http://localhost:8080/bookings", {
                    method: "PUT",
                    body: JSON.stringify({
                        firstName: "test",
                        lastName: "test"
                    }),
                    headers: { 'Content-Type': 'application/json' }
                }).then(res => res.json());

                expect(response).have.property("error").equal(true);
                expect(response).have.property("msg").equal(Const.addBookingError.noEmail);

            } catch (err) {
                throw err;
            }

        });

        it('no phone number', async function () {

            try {

                const response = await fetch("http://localhost:8080/bookings", {
                    method: "PUT",
                    body: JSON.stringify({
                        firstName: "test",
                        lastName: "test",
                        email: "test@test.com"
                    }),
                    headers: { 'Content-Type': 'application/json' }
                }).then(res => res.json());

                expect(response).have.property("error").equal(true);
                expect(response).have.property("msg").equal(Const.addBookingError.noPhoneNumber);

            } catch (err) {
                throw err;
            }

        });

        it('add booking', async function () {

            try {

                const response = await fetch("http://localhost:8080/bookings", {
                    method: "PUT",
                    body: JSON.stringify({
                        firstName: "test",
                        lastName: "test",
                        email: "test@test.com",
                        phoneNumber: "12345"
                    }),
                    headers: { 'Content-Type': 'application/json' }
                }).then(res => res.json());

                expect(response).have.property("data").to.be.an("object");
                expect(response.data).have.property("booking").to.be.an("object");
                expect(response.data.booking).have.property("_id");

                global.newBookingId = response.data.booking._id;

            } catch (err) {
                throw err;
            }

        });

    });

    describe('DELETE /bookings/:id', function () {

        it('missing authorization header', async function () {

            try {

                const response = await fetch(
                    `http://localhost:8080/bookings/${global.newBookingId}`, {
                        method: "DELETE"
                    })
                    .then(res => res.json());

                expect(response).have.property("error").equal(true);
                expect(response).have.property("msg").equal(Const.authorizationError.invalid);

            } catch (err) {
                throw err;
            }

        });

        it('invalid authorization', async function () {

            try {

                const response = await fetch(
                    `http://localhost:8080/bookings/${global.newBookingId}`, {
                        method: "DELETE",
                        headers: { 'Authorization': "test" }
                    })
                    .then(res => res.json());

                expect(response).have.property("error").equal(true);
                expect(response).have.property("msg").equal(Const.authorizationError.invalid);

            } catch (err) {
                throw err;
            }

        });

        it('invalid booking id', async function () {

            try {

                const response = await fetch(
                    `http://localhost:8080/bookings/1234`, {
                        method: "DELETE",
                        headers: { 'Authorization': global.apiAuth }
                    })
                    .then(res => res.json());

                expect(response).have.property("error").equal(true);
                expect(response).have.property("msg").equal(Const.deleteBookingError.invalidId);

            } catch (err) {
                throw err;
            }

        });

        it('delete booking by id', async function () {

            try {

                const response = await fetch(
                    `http://localhost:8080/bookings/${global.newBookingId}`, {
                        method: "DELETE",
                        headers: { 'Authorization': global.apiAuth }
                    })
                    .then(res => res.json());

                expect(response).have.property("data").to.be.an("object");

            } catch (err) {
                throw err;
            }

        });

    });

});
