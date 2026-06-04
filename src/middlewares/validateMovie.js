const { check } = require('express-validator');

const movieValidator = [
    check('titulo')
        .trim()
        .notEmpty().withMessage("Title is required")
        .isLength({ min: 3}).withMessage('Title cannot be empty'),

    check('director')
        .trim()
        .notEmpty().withMessage('Director is required'),

    check('anio')
        .notEmpty().withMessage('Year is required')
        .isInt({ min: 1900, max: new Date().getFullYear() }).withMessage('Year must be valid'),

    check('duracion')
        .notEmpty().withMessage('Duration is required')
        .isInt({ min: 1, max :600 }).withMessage('Duration must be a number')
]

module.exports = movieValidator