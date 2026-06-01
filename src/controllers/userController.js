const jwt = require('jsonwebtoken')
const { loginUserService, registerUserService } = require('../models/User')
const { setResponse } = require('../utils/utils')

const registerUser = async (req, res) => {

    try {

        const userData = await registerUserService(req.body)
      
        const token = generateToken(userData)
        return setResponse(res, true, 201, "registred successfully", token, userData)

    } catch (error) {
        console.log(error)
        return setResponse(res, false, 400, "Bad request")
    }

}

const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body
         

        const loggedUser = await loginUserService(email, password)

        const token = generateToken(loggedUser)

        return setResponse(res, true, 200, "logged in successfully", token, loggedUser)

    } catch (error) {
        console.log(error)
        return setResponse(res, false, 400, "Password or email not correct")
    }
}
const generateToken = (user) => {
    return jwt.sign(
        { id: user.id_usuario, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )
}


module.exports = { registerUser, loginUser }