import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

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
