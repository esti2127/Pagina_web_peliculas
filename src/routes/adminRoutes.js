const express = require('express')
const { getMovieDetails, getMovieList, updateMovie, addNewMovie, deleteMovie } = require('../controllers/movieController')
const validateAdmin = require('../middlewares/validateAdmin')
const upload = require('../config/cloudinary')
 const adminRoutes = express.Router()



adminRoutes.get('/:id', getMovieDetails)
adminRoutes.get('/',validateAdmin, getMovieList)
adminRoutes.post('/', [validateAdmin, upload.single("imagen")], addNewMovie)
adminRoutes.put('/:id', [validateAdmin, upload.single("imagen")], updateMovie)
adminRoutes.delete('/:id', validateAdmin, deleteMovie)







module.exports = adminRoutes
