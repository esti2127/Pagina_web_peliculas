const express = require('express')
const { searchMovie, getFavorites, setFavorite, getMovieDetails, deleteFavorite } = require('../controllers/movieController')
const validateAdmin = require('../middlewares/validateAdmin')
const upload = require('../config/cloudinary')
const validateUser = require('../middlewares/validateUser')
const movieRouter = express.Router()


movieRouter.get('/search', validateAdmin, searchMovie)
movieRouter.post('/favorites/:id', validateUser, setFavorite)
movieRouter.get('/favorites', validateUser, getFavorites)
movieRouter.delete('/favorites/:id', validateUser, deleteFavorite)

module.exports = movieRouter