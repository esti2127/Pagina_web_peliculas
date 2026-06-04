const { check } = require('express-validator');

const loginValidator = [
    check("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage('Must be a valid email')
        .normalizeEmail(),
    
    check("password")
        .notEmpty().withMessage('Password is required')
];

module.exports = loginValidator;