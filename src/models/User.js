const bcrypt = require('bcryptjs')
const { pool } = require('../config/pool')


const registerUserService = async (body) => {

    const { nombre, email, password, rol } = body

    const hashPassword = await generateHashPassword(password)
 
    const resp = await pool.query(
        'INSERT INTO usuarios(nombre, email, password_hash, rol) VALUES ($1, $2, $3, $4) RETURNING id_usuario, nombre, email, rol',
        [nombre, email, hashPassword, rol]
    )
 
    if (resp) {
        return resp.rows[0]
    }

}


const loginUserService = async (email, password) => {

    const resp = await pool.query(
        'SELECT * FROM usuarios WHERE email = $1',
        [email]
    )
    const user = resp.rows[0]
 
    if (!user) {
        throw new Error('User is not registred')
    }
    const { password_hash: hash, ...userData } = user
    const isValidPassword = await verifyUserPassword(password, hash)
    if (!isValidPassword) {
        throw new Error('Invalid password')
    }
    return userData
}

const verifyUserPassword = async (password, hash) => {

    const isValidPassword = await bcrypt.compare(password, hash)
    return isValidPassword
}

const generateHashPassword = async (password) => {
    const hashPassword = await bcrypt.hash(password, 10)
    return hashPassword
}

module.exports = { registerUserService, loginUserService }