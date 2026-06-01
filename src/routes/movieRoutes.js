
const express = require('express')
const { searchMovie } = require('../controllers/searchMovie')
const movieRouter = express.Router()


movieRouter.get('/search', searchMovie)


module.exports = movieRouter