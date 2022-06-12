import Department from '../models/Department.js';

/**
 * @description - This function is used to add a department to the system.
 * It will create a new department and save it to the database.
 * It will return the new department.
 * @param req
 * @param res
 * @param next
 */
export const addDepartment = (req, res, next) => {

    const {
        name,
        designation,
    } = req.body;

    if (!name || !designation) {
        return res.status(400).json({
            error: 'Please provide all required fields',
        });
    }

    const department = new Department({
        name,
        designation,
    });

    department.save().then((result) => {
        res.status(201).json({
            message: 'Department added successfully!',
            result,
        });
    }).catch((err) => {
        res.status(500).json({
            error: err.message
        })
    })
}

/**
 * @description - This function is used to get all departments.
 * @param req
 * @param res
 * @param next
 */
export const getAllDepartments = (req, res, next) => {
    Department.find().then((result) => {
        res.status(201).json({
            message: 'Departments fetched successfully!',
            result,
        });
    }).catch((err) => {
        res.status(500).json({
            error: err.message
        })
    })
}