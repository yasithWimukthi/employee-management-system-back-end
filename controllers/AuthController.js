import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

/**
 * @description - This function is used to register to the system.
 * It will create a new user and save it to the database.
 * It will return a token to the user.
 * The token will be used to authenticate the user.
 * The token will expire in 7 days.
 * @param req
 * @param res
 * @param next
 * @returns jsonwebtoken
 */
export const signUp = async (req, res, next) => {
    const {
        name,
        email,
        password,
    } = req.body

    try {
        const hashedPw = await bcrypt.hash(password, 12)

        const user = new User({
            email,
            name,
            password: hashedPw,
        })

        const userResult = await user.save()

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        })

        userResult.password = undefined
        userResult.secret = undefined

        res.status(201).json({
            message: 'Student signup successfully!',
            userResult,
            token,
        })
    } catch (err) {
        res.status(500).json({
            error:err.message
        })
    }
}

/**
 * @description - This function is used to login to the system.
 * It will check if the user exists in the database.
 * If the user exists, it will return a token to the user. The token will be used to authenticate the user. The token will expire in 7 days.
 * @param req
 * @param res
 * @returns jsonwebtoken
 */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email });

        if (!user) {
            const error = new Error(
                'A user with this email could not be found.'
            )
            error.statusCode = 401
            throw error
        }

        const isEqual = await bcrypt.compare(password, user.password)

        if (!isEqual) {
            const error = new Error('Wrong password!')
            error.statusCode = 401
            throw error
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        })

        user.password = undefined
        user.secret = undefined

        res.json({
            token,
            user,
        })
    } catch (err) {
        res.status(500).json({
            error: 'Login failed. Try again.',
        })
    }
}
