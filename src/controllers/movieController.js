const { database } = require("pg/lib/defaults")
const { findMovieService, addNewMovieService, findMovieByIdService, getUserFavService, deleteFavService, getAllMoviesService, deleteMovieService, updateMovieService } = require("../models/Movie")
const getFilms = require("../models/Peli_Externa")
const { setResponse } = require("../utils/utils")


const searchMovie = async (req, res) => {

    try {
        const movies = await findMovieService(req.body.titulo)
        if (movies === 0) {
            //api externa
            const data = await getFilms(req.body.titulo)

            const { Title: titulo, Year: anio, Runtime, Poster: imagen, Director: director, imdbID: codigo_pelicula } = data
            const duracion = Runtime.split(' ')[0]
            
            await addNewMovieService(titulo, imagen, anio, director, duracion, codigo_pelicula)

            return res.status(200).json({
                ok: true,
                message: "movie found",
                source:"external",
                data
            })
            await addNewMovieService(titulo, imagen, anio, director, duracion, codigo_pelicula)
        }
        return res.status(200).json({
            ok: true,
            message: "Search Details",
            source:"local",
            movies
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok: false,
            message: "No movie found"
        })
    }

}

const getFavorites = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({
                ok: false,
                message: "User id not found"
            });
        }

        const favs = await getUserFavService(userId)

        if (favs.length === 0) {
            return res.status(200).json({
                ok: true,
                message: "User doesnt have favs yet"
            });
        }

        return res.status(200).json({
            ok: true,
            message: "User favs",
            favs
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            ok: false,
            message: "Server error"
        })
    }
}

const setFavorite = async (req, res) => {
    try {
        const { id_usuario: userId, id_pelicula: movieId } = req.body

        const favs = await setUserFavService(userId, movieId)
        if (favs.length === 0) {
            return res.status(400).json({
                ok: false,
                message: "Error adding movie to favs"
            })
        }

        res.status(200).json({
            ok: true,
            message: "Movie has been added to favs",
            favs
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: "Error server"
        })
    }
}
const getMovieDetails = async (req, res) => {
    try {
        const { id: movieId } = req.params;
        //  console.log(movieId);

        const foundMovie = await findMovieByIdService(movieId);
        
        if (foundMovie === 0 || !foundMovie) {
            return res.status(404).json({
                ok: false,
                message: "Movie not found on db"
            });
        }

        const { id_pelicula, ...movieData } = foundMovie;

        return res.status(200).json({
            ok: true,
            message: "Movie Details",
            movieData
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}

const deleteFavorite = async (req, res) => {
    try {
        const { id: movieId } = req.params
        const userId = req.user.id;

        const removedFav = await deleteFavService(userId, movieId);

        if (removedFav === 0) {
            return res.status(404).json({
                ok: false,
                message: "Fav not found for this user"
            })
        }

        return res.status(200).json({
            ok: true,
            message: "Fav removed successfully"
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: "Server error"
        })
    }
}

const getMovieList = async (req, res) => {
    try {

        const movies = await getAllMoviesService()

        if (movies.length === 0) {
            return res.status(200).json({
                ok: true,
                message: "movies not found in db",
            })
        }

        return res.status(200).json({
            ok: true,
            message: "Movie list details",
            movies
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: "server error"
        })
    }
}

const addNewMovie = async (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            ok: false,
            message: "No file uploaded"
        })
    }

    const imagen = req.file.path

    const { titulo, director, anio, duracion } = req.body

    const codigo_pelicula = generarCodigoPelicula(titulo)

    try {

        const addedMovie = await addNewMovieService(titulo, imagen, anio, director, duracion, codigo_pelicula)
        return res.status(201).json({
            ok: true,
            message: "Movie has been created successfully",
            addedMovie
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            message: "Server Error"
        })
    }

}


const updateMovie = async (req, res) => {
    try {
        const { id: movieId } = req.params
        const { titulo, director, anio, duracion } = req.body

        if (!titulo || !director || !anio || !duracion) {
            return res.status(400).json({
                ok: false,
                message: "Fill required inputs titlo, director, anio ,duracion"
            })
        }

        let imagen = null
        if (req.file) {
            imagen = req.file.path
        }

        const codigo_pelicula = generarCodigoPelicula(titulo);

        const updatedMovie = await updateMovieService(movieId, titulo, imagen, anio, director, duracion, codigo_pelicula);

        if (!updatedMovie) {
            return res.status(404).json({
                ok: false,
                message: "Movie not found in database"
            })
        }

        return res.status(200).json({
            ok: true,
            message: "Movie updated successfully",
            updatedMovie
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: "Server Error"
        })
    }
}
const deleteMovie = async (req, res) => {
    try {
        const { id: movieId } = req.params;

        const resp = await deleteMovieService(movieId);

        if (resp === 0) {
            return res.status(404).json({
                ok: false,
                message: "Movie doesnt exist in database"
            })
        }


        return res.status(200).json({
            ok: true,
            message: "Movie deleted successfully"
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: "SErver error"
        })
    }
}

function generarCodigoPelicula(titulo) {

    const pref = titulo.trim().substring(0, 2);

    const min = 11111;
    const max = 99999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    return pref + randomNumber;
}
module.exports = { searchMovie, getFavorites, deleteFavorite, setFavorite, getMovieList, deleteMovie, getMovieDetails, updateMovie, addNewMovie }