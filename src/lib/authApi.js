const Utils = require("./utils");

const checkAdmin = async (req, res, next) => {

    try {

        const accessToken = req.header("auth");



        next();

    } catch (err) {
        console.error('error auth:', err);
        Utils.errorResponse(res, 'Auth error');
    }

}

module.exports = checkAdmin;