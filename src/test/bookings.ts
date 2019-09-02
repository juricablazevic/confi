import Const from "../lib/consts";
import { expect } from "chai";
import server from "../index.test";
import { agent } from "supertest";

const request = agent(server);

before(done =>
    server.on("serverStarted", done)
);

after(done => {
    done();
    process.exit(1);
});

const basePath = "/api/bookings";
const apiAuth = "Basic YWRtaW46cGFzc3dvcmQ=";
let newBookingId: string;

describe('Bookings API routes', function () {

    describe(`GET ${basePath}`, function () {

        it('missing authorization header', async function () {

            try {

                const response = await request
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

                const response = await request
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

                const response = await request
                    .get(basePath)
                    .set('Authorization', apiAuth);

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

                const response = await request
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

                const response = await request
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

                const response = await request
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

                const response = await request
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

                const response = await request
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

                newBookingId = body.data.booking._id;

            } catch (err) {
                throw err;
            }

        });

    });

    describe(`DELETE ${basePath}/:id`, function () {

        it('missing authorization header', async function () {

            try {

                const response = await request
                    .delete(`${basePath}/${newBookingId}`);

                const body = response.body;

                expect(body).have.property("error").equal(true);
                expect(body).have.property("msg").equal(Const.authorizationError.invalid);

            } catch (err) {
                throw err;
            }

        });

        it('invalid authorization', async function () {

            try {

                const response = await request
                    .delete(`${basePath}/${newBookingId}`)
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

                const response = await request
                    .delete(`${basePath}/1234`)
                    .set('Authorization', apiAuth);

                const body = response.body;

                expect(body).have.property("error").equal(true);
                expect(body).have.property("msg").equal(Const.deleteBookingError.invalidId);

            } catch (err) {
                throw err;
            }

        });

        it('delete booking by id', async function () {

            try {

                const response = await request
                    .delete(`${basePath}/${newBookingId}`)
                    .set('Authorization', apiAuth);

                const body = response.body;

                expect(body).have.property("data").to.be.an("object");

            } catch (err) {
                throw err;
            }

        });

    });

});
