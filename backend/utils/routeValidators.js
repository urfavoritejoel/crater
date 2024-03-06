const { check } = require('express-validator');
const { handleValidationErrors } = require('./validation');

const validatePost = [
    check('title')
        .exists()
        .notEmpty()
        .withMessage('Title is required'),
    check('title')
        .custom(value => !value.startsWith(' ') && !value.endsWith(' '))
        .withMessage('Title cannot start or end with a space'),
    check('title')
        .isLength({ min: 3, max: 50 })
        .withMessage('Title must be between 3 and 50 characters'),
    check('body')
        .exists()
        .notEmpty()
        .withMessage('Post content is required'),
    check('body')
        .isLength({ min: 4, max: 1000 })
        .withMessage('Post message must be between 4 and 1000 characters'),
    check('body')
        .custom(value => !value.startsWith(' ') && !value.endsWith(' '))
        .withMessage('Post message cannot start or end with a space'),
    handleValidationErrors
];

const validateComment = [
    check('body')
        .custom(value => !value.startsWith(' ') && !value.endsWith(' '))
        .withMessage('Post message cannot start or end with a space'),
    check('body')
        .exists({ checkFalsy: true })
        .trim()
        .isLength({ min: 4, max: 255 })
        .withMessage('Comment must be 4 to 255 characters'),
    handleValidationErrors
];

const postTypes = ['update', 'song'];

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];

//backend validation for signup
const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('email')
        .custom(value => !/\s/.test(value))
        .withMessage('Email can not include spaces'),
    check('username')
        .custom(value => !/\s/.test(value))
        .withMessage('Username can not include spaces'),
    check('password')
        .custom(value => !/\s/.test(value))
        .withMessage('Password can not include spaces'),
    check('username')
        .exists({ checkFalsy: true })
        .trim()
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .trim()
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

module.exports = { validatePost, validateComment, postTypes, validateLogin, validateSignup }
