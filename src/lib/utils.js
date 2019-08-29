module.exports = {
    successResponse: (res, data = {}) => {
        res.json({
            error: false,
            data
        })
    },
    errorResponse: (res, msg = "") => {
        res.json({
            error: true,
            msg
        })
    }
}