const { findMovieService } = require("../models/Movie")
const { setResponse } = require("../utils/utils")



const searchMovie = async (req, res) => {

    const { titulo } = req.body
    console.log(titulo)

    // let movies = []
    try {
        const movies = await findMovieService(titulo)
        if (movies === 0) {
            //TODO get it from external api. 
            throw new Error('No movie found')
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