const { findMovieService } = require("../models/Movie")
const getFilms = require("../models/Peli_Externa")
const { setResponse } = require("../utils/utils")



const searchMovie = async (req, res) => {

   // const { titulo } = req.body

    try {
        const movies = await findMovieService(req.body.titulo)
        if (movies === 0) {
            //api externa
           const data = await getFilms(req.body.titulo)
          
           const {Title:titulo, Year:anio, Runtime:duracion, Poster:imagen, Director:director, imdbID:codigo_pelicula} = data
         //  console.log(title, imagen, anio, id )

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