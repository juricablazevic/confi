'use strict';
const expect = require('chai').expect;
const Const = require("../src/lib/consts");

const basePath = "/api/bookings";

describe('Bookings API routes', function () {

    describe(`GET ${basePath}`, function () {

        it('missing authorization header', async function () {

            try {

                const response = await global.request
                    .get(basePath);

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
                    .get(basePath)
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
                    .get(basePath)
                    .set('Authorization', global.apiAuth);

                const body = response.body;

                expect(body).have.property("data").to.be.an("object");
                expect(body.data).have.property("bookings").to.be.an("array");

            } catch (err) {
                throw err;
            }

        });

    });

    describe(`PUT ${basePath}`, function () {

        it('no first name', async function () {

            try {

                const response = await global.request
                    .put(basePath);

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
                    .put(basePath)
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
                    .put(basePath)
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
                    .put(basePath)
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
                    .put(basePath)
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

    describe(`DELETE ${basePath}/:id`, function () {

        it('missing authorization header', async function () {

            try {

                const response = await global.request
                    .delete(`${basePath}/${global.newBookingId}`);

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
                    .delete(`${basePath}/${global.newBookingId}`)
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
                    .delete(`${basePath}/1234`)
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
                    .delete(`${basePath}/${global.newBookingId}`)
                    .set('Authorization', global.apiAuth);

                const body = response.body;

                expect(body).have.property("data").to.be.an("object");

            } catch (err) {
                throw err;
            }

        });

    });

});
