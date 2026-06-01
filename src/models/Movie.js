const { pool } = require('../config/pool')


const findMovieService = async (titulo) => {

    try {
        const resp = await pool.query(
            'SELECT * FROM peliculas WHERE titulo=$1',
            [titulo]
        )
        console.log(`la respuesta : ${resp}`)
        return resp.rows.length === 0 ? 0 : resp.rows

    } catch (error) {
        console.log(error)
        throw new Error('Movie is not found on local db')
    }

}



module.exports = { findMovieService }