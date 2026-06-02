const { pool } = require('../config/pool')


const findMovieService = async (titulo) => {

    try {
        const resp = await pool.query(
            'SELECT * FROM peliculas WHERE titulo=$1',
            [titulo]
        )
        return resp.rows.length === 0 ? 0 : resp.rows

    } catch (error) {
        console.log(error)
        throw new Error('Movie is not found on local db')
    }
}

const getAllMoviesService = async () => {
    try {
        const resp = await pool.query(
            'SELECT * FROM peliculas'
        )
        return resp.rows;

    } catch (error) {
        console.error(error)
        throw new Error('Error db')
    }
}

const findMovieByIdService = async (movieId) => {
    try {
        const resp = await pool.query(
            'SELECT * FROM peliculas WHERE codigo_pelicula=$1',
            [movieId]
        )
        console.log(resp)
        return resp.rows.length === 0 ? 0 : resp.rows[0];

    } catch (error) {
        console.log(error);
        throw new Error('Server Error');
    }
}

const getUserFavService = async (userId) => {
    try {
        const resp = await pool.query(
            `SELECT f.id_favorito, p.* FROM favoritos f
     INNER JOIN peliculas p ON f.id_pelicula = p.id_pelicula
     WHERE f.id_usuario = $1`,
            [userId]
        )

        return resp.rows;
    } catch (error) {
        console.error(error);
        throw new Error('Error server');
    }
}

const setUserFavService = async (userId, movieId) => {

    try {
        const resp = await pool.query(
            'INSERT INTO favoritos id_usuario, id_pelicua VALUES ($1, $2) returning *',
            [userId, movieId]
        )
        return resp.rows[0]

    } catch (error) {
        console.log(error)
        throw new Error('Error fetching data from db')
    }
}

const addNewMovieService = async (titulo, imagen, anio, director, duracion, codigo_pelicula) => {
    try {
        const resp = await pool.query(
            'INSERT INTO peliculas (titulo,imagen,anio,director,duracion,codigo_pelicula) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
            [titulo, imagen, anio, director, duracion, codigo_pelicula]
        )
        console.log(resp)
        return resp.rows[0]
    } catch (error) {
        console.log(error)
        throw new Error('Cant add movie to database')
    }

}
const updateMovieService = async (movieId, titulo, imagen, anio, director, duracion, codigo_pelicula) => {
    try {
        const resp = await pool.query(
            `UPDATE peliculas 
             SET titulo = $2, 
                 imagen = COALESCE($3, imagen), 
                 anio = $4, 
                 director = $5, 
                 duracion = $6, 
                 codigo_pelicula = $7
             WHERE id_pelicula = $1 
             RETURNING *`,
            [movieId, titulo, imagen, anio, director, duracion, codigo_pelicula]
        );

        return resp.rows[0]
        
    } catch (error) {
        console.error(error)
        throw new Error('Cannt update movie')
    }
}

const deleteMovieService = async (movieId) => {
    try {
        const resp = await pool.query(
            'DELETE FROM peliculas WHERE id_pelicula = $1',
            [movieId]
        )

        return resp.rowCount;

    } catch (error) {
        console.error("Database Error:", error);
        throw new Error('Error movie delete from database');
    }
}

const deleteFavService = async (userId, movieId) => {
    try {
        const resp = await pool.query(
            'DELETE FROM favoritos WHERE id_usuario = $1 AND id_pelicula = $2',
            [userId, movieId]
        )
        return resp.rowCount

    } catch (error) {
        console.error(error)
        throw new Error('Error delete fav form db')
    }
}

module.exports = { findMovieService, getAllMoviesService, getUserFavService, deleteMovieService, deleteFavService, setUserFavService, addNewMovieService, findMovieByIdService }