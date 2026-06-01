const jwt = require('jsonwebtoken')
const { loginUserService, registerUserService } = require('../models/User')
const { setResponse } = require('../utils/utils')

const registerUser = async (req, res) => {

    try {

        const registredUser = registerUserService(req.body)
        const token = generateToken(registredUser)
        return setResponse(res, true, 201, "registred successfully", token, registredUser)

    } catch (error) {
        console.log(error.stack)
        return setResponse(res, false, 400, "Bad request")
    }

}

const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body

        const loggedUser = loginUserService(email, password)

        const token = generateToken(loggedUser)

        return setResponse(res, true, 200, "logged in successfully", token, loggedUser)

    } catch (error) {
        console.log(error.stack)
        return setResponse(res, false, 400, "BAd request")
    }
}
const generateToken = (user) => {
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )
}


module.exports = { registerUser, loginUser }