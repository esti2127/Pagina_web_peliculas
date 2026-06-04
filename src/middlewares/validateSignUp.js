const { check } = require('express-validator');

const signupValidator = [
    check("nombre")
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
    
    check("email")
        .trim()
        .notEmpty().withMessage("email is required")
        .isEmail().withMessage("Provide valid email"),
        
    
    check('password')
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 4 }).withMessage('Password must be at least 6 characters long'),
    
    check("rol")
        .trim()
        .notEmpty().withMessage('Rol  is required')
        .isIn(['user', 'admin']).withMessage('Rol must be: user or admin')
]

module.exports = signupValidator