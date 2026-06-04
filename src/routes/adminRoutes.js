const express = require('express')
const { getMovieDetails, getMovieList, updateMovie, addNewMovie, deleteMovie } = require('../controllers/movieController')
const validateAdmin = require('../middlewares/validateAdmin')
const upload = require('../config/cloudinary')
const handleValidation = require('../middlewares/handleValidationErrors')
const movieValidator = require('../middlewares/validateMovie')
const adminRoutes = express.Router()



adminRoutes.get('/:id', getMovieDetails)
adminRoutes.get('/', validateAdmin, getMovieList)
adminRoutes.post('/', [validateAdmin, upload.single("imagen"), movieValidator, handleValidation], addNewMovie)
adminRoutes.put('/:id', [validateAdmin, upload.single("imagen"), movieValidator, handleValidation], updateMovie)
adminRoutes.delete('/:id', validateAdmin, deleteMovie)







module.exports = adminRoutes
