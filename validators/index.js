const {check, validationResult} = require('express-validator');

/**
 * validate signup form data
 *
 */
exports.userSignupValidator = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email')
        .matches(/.+\@.+\..+/)
        .withMessage('Email must contain @')
        .isLength({
            min: 4,
            max: 32
        }),
    check('password')
        .isLength({
            min: 6
        })
        .withMessage('Password must contain at least 6 characters')
        .matches(/\d/)
        .withMessage('Password must contain a number'),
    check('confirmPassword')
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation does not match password');
            }
            return true;
        }),
    (req, res, next) => {
        const errorFormatter = ({location, msg, param, value, nestedErrors}) => {
            // return `${location}[${param}]: ${msg}`;
            return msg;
        };
        const result = validationResult(req).formatWith(errorFormatter);
        if (!result.isEmpty()) {
            const firstError = result.array()[0];
            return res.status(401).json({error: firstError});
        }
        next();
    },
];