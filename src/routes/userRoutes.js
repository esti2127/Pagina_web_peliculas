const express = require('express')
const { registerUser, loginUser } = require('../controllers/userController')
const { searchMovie } = require('../controllers/movieController');
const handleValidation = require('../middlewares/handleValidationErrors');
const signupValidator = require('../middlewares/validateSignUp');
const loginValidator = require('../middlewares/validateLogin');
const router = express.Router()



router.post('/signup', signupValidator, handleValidation, registerUser);
router.post('/login', loginValidator, handleValidation, loginUser);



module.exports = router 