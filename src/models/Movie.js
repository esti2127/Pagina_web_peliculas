const { pool } = require('../config/pool')


const findMovieService = async (titulo) => {

    try {
        const resp = await pool.query(
            'SELECT * FROM peliculas WHERE titulo=$1',
            [titulo]
        )
        return resp.rows

    } catch (error) {
        console.log(error)
        throw error
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
        throw error
    }
}

const findMovieByIdService = async (movieId) => {
    try {
        const resp = await pool.query(
            'SELECT * FROM peliculas WHERE codigo_pelicula=$1',
            [movieId]
        )
        // console.log(resp)
        return resp.rows.length === 0 ? 0 : resp.rows[0];

    } catch (error) {
        console.log(error);
        throw error
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

        // console.log(resp.rows)
        return resp.rows

    } catch (error) {
        console.error(error);
        throw error
    }
}

const setUserFavService = async (userId, movieId) => {
    try {
        //check if the movie if is already in favs
        const existingFav = await pool.query(
            'SELECT id_favorito FROM favoritos WHERE id_usuario = $1 AND id_pelicula = $2',
            [userId, movieId]
        )

        if (existingFav.rows.length > 0) {
            return 
        }

        const resp = await pool.query(
            'INSERT INTO favoritos (id_usuario, id_pelicula) VALUES ($1, $2) RETURNING id_favorito',
            [userId, movieId]
        )

        const savedFavId = resp.rows[0].id_favorito;

        /// we do join to get user and movie data, we need to do this because favoritos tables
        //  just return keys ids not user and movie details.
        const favDetails = await pool.query(
            `SELECT 
                f.id_favorito, 
                u.nombre AS usuario_nombre, 
                u.email AS usuario_email,
                p.id_pelicula, 
                p.titulo, 
                p.imagen, 
                p.anio, 
                p.director, 
                p.duracion, 
                p.codigo_pelicula
             FROM favoritos f
             JOIN usuarios u ON f.id_usuario = u.id_usuario
             JOIN peliculas p ON f.id_pelicula = p.id_pelicula
             WHERE f.id_favorito = $1`,
            [savedFavId]
        )

        return favDetails.rows[0]

    } catch (error) {
        console.error(error)
        throw error
    }
}
const addNewMovieService = async (titulo, imagen, anio, director, duracion, codigo_pelicula) => {
    try {
        const resp = await pool.query(
            'INSERT INTO peliculas (titulo,imagen,anio,director,duracion,codigo_pelicula) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
            [titulo, imagen, anio, director, duracion, codigo_pelicula]
        )
        // console.log(resp)
        return resp.rows[0]
    } catch (error) {
        console.log(error)
        throw error
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
        throw error
    }
}

const deleteMovieService = async (movieId) => {
    try {
        const resp = await pool.query(
            'DELETE FROM peliculas WHERE id_pelicula = $1',
            [movieId]
        )

        return resp.rowCount

    } catch (error) {
        console.error(error)
        throw error
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
        throw error
    }
}

module.exports = { findMovieService, getAllMoviesService, updateMovieService, getUserFavService, deleteMovieService, deleteFavService, setUserFavService, setUserFavService, addNewMovieService, findMovieByIdService }