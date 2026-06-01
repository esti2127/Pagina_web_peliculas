const setResponse = (res, ok, statusCode, message, token = null, user = null) => {
    return res.status(statusCode).json({
        ok,
        message,
        token,
        user
    })
}

module.exports = { setResponse }