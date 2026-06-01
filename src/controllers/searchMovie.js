const { findMovieService } = require("../models/Movie")
const getFilms = require("../models/Peli_Externa")
const { setResponse } = require("../utils/utils")



const searchMovie = async (req, res) => {

    const { titulo } = req.body
    console.log(titulo)

    // let movies = []
    try {
        const movies = await findMovieService(titulo)
        if (movies === 0) {
            //api externa
           const data = await getFilms(titulo)
           const {title, poster_path: imagen, release_date: anio, id } = data
           console.log(title, imagen, anio, id )

           //
 
           return res.status(200).json({
            ok:true,
            message: "movie found",
            data
           })
           // throw new Error('No movie found')
        }
        return res.status(200).json({
            ok: true,
            message: "Search Details",
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

module.exports = { searchMovie }