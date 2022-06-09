const {check, validationResult} = require('express-validator');

/**
 * validate signup form data
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

/**
 * validate add employee and update employee form data
 * @type {ValidationChain[]}
 */
exports.employeeValidator = [
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),
    check('birthDate', 'Birth date is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
    check('contactNumber', 'Contact number is required').not().isEmpty(),
    check('department', 'Department is required').not().isEmpty(),
    check('designation', 'Designation is required').not().isEmpty(),
    check('employeeId', 'Employee id is required').not().isEmpty(),
    check('nic', 'NIC is required').not().isEmpty(),
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
    }
]