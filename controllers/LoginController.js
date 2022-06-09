import Login from '../models/Login.js'
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

        const user = new Student({
            email,
            name,
            password: hashedPw,
        })

        const login = new Login({
            email,
            password: hashedPw,
            type: 'student',
            student: student._id,
        })
        const studentResult = await student.save()
        const loginResult = await login.save()

        const createdStudent = await Student.findById(
            studentResult._id
        ).populate('login')
        createdStudent.login = loginResult._id
        createdStudent.save()

        res.status(201).json({
            message: 'Student signup successfully!',
            userId: studentResult._id,
        })
    } catch (err) {
        res.status(500).json({
            error:err.message
        })
    }
}
