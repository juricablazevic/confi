'use strict';
const expect = require('chai').expect;
const Const = require("../src/lib/consts");

describe('Bookings API routes', function () {

    describe('GET /bookings', function () {

        it('missing authorization header', async function () {

            try {

                const response = await global.request
                    .get('/bookings');

                const body = response.body;

                expect(body).have.property("error").equal(true);
                expect(body).have.property("msg").equal(Const.authorizationError.invalid);

            } catch (err) {
                throw err;
            }

        });

        it('invalid authorization', async function () {

            try {

                const response = await global.request
                    .get('/bookings')
                    .set('Authorization', "test");

                const body = response.body;

                expect(body).have.property("error").equal(true);
                expect(body).have.property("msg").equal(Const.authorizationError.invalid);

            } catch (err) {
                throw err;
            }

        });

        it('returns a list of bookings', async function () {

            try {

                const response = await global.request
                    .get('/bookings')
                    .set('Authorization', global.apiAuth);

                const body = response.body;

                expect(body).have.property("data").to.be.an("object");
                expect(body.data).have.property("bookings").to.be.an("array");

            } catch (err) {
                throw err;
            }

        });

    });

    describe('PUT /bookings', function () {

        it('no first name', async function () {

            try {

                const response = await global.request
                    .put('/bookings');

                const body = response.body;

                expect(body).have.property("error").equal(true);
                expect(body).have.property("msg").equal(Const.addBookingError.noFirstName);

            } catch (err) {
                throw err;
            }

        });

        it('no last name', async function () {

            try {

                const response = await global.request
                    .put('/bookings')
                    .send({
                        firstName: "test"
                    });

                const body = response.body;

                expect(body).have.property("error").equal(true);
                expect(body).have.property("msg").equal(Const.addBookingError.noLastName);

            } catch (err) {
                throw err;
            }

        });

        it('no email', async function () {

            try {

                const response = await global.request
                    .put('/bookings')
                    .send({
                        firstName: "test",
                        lastName: "test"
                    });

                const body = response.body;

                expect(body).have.property("error").equal(true);
                expect(body).have.property("msg").equal(Const.addBookingError.noEmail);

            } catch (err) {
                throw err;
            }

        });

        it('no phone number', async function () {

            try {

                const response = await global.request
                    .put('/bookings')
                    .send({
                        firstName: "test",
                        lastName: "test",
                        email: "test@test.com"
                    });

                const body = response.body;

                expect(body).have.property("error").equal(true);
                expect(body).have.property("msg").equal(Const.addBookingError.noPhoneNumber);

            } catch (err) {
                throw err;
            }

        });

        it('add booking', async function () {

            try {

                const response = await global.request
                    .put('/bookings')
                    .send({
                        firstName: "test",
                        lastName: "test",
                        email: "test@test.com",
                        phoneNumber: "12345"
                    });

                const body = response.body;

                expect(body).have.property("data").to.be.an("object");
                expect(body.data).have.property("booking").to.be.an("object");
                expect(body.data.booking).have.property("_id");

                global.newBookingId = body.data.booking._id;

            } catch (err) {
                throw err;
            }

        });

    });

    describe('DELETE /bookings/:id', function () {

        it('missing authorization header', async function () {

            try {

                const response = await global.request
                    .delete(`/bookings/${global.newBookingId}`);

                const body = response.body;

                expect(body).have.property("error").equal(true);
                expect(body).have.property("msg").equal(Const.authorizationError.invalid);

            } catch (err) {
                throw err;
            }

        });

        it('invalid authorization', async function () {

            try {

                const response = await global.request
                    .delete(`/bookings/${global.newBookingId}`)
                    .set('Authorization', "test");

                const body = response.body;

                expect(body).have.property("error").equal(true);
                expect(body).have.property("msg").equal(Const.authorizationError.invalid);

            } catch (err) {
                throw err;
            }

        });

        it('invalid booking id', async function () {

            try {

                const response = await global.request
                    .delete(`/bookings/1234`)
                    .set('Authorization', global.apiAuth);

                const body = response.body;

                expect(body).have.property("error").equal(true);
                expect(body).have.property("msg").equal(Const.deleteBookingError.invalidId);

            } catch (err) {
                throw err;
            }

        });

        it('delete booking by id', async function () {

            try {

                const response = await global.request
                    .delete(`/bookings/${global.newBookingId}`)
                    .set('Authorization', global.apiAuth);

                const body = response.body;

                expect(body).have.property("data").to.be.an("object");

            } catch (err) {
                throw err;
            }

        });

    });

});
