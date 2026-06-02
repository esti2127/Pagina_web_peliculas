
const express = require('express')
const { searchMovie } = require('../controllers/searchMovie')
const validateAdmin = require('../middlewares/validateAdmin')
const movieRouter = express.Router()


movieRouter.get('/search', searchMovie)
movieRouter.post('/add', validateAdmin, )


module.exports = movieRouter