import Employee from "../models/Employee.js";

/**
 * @description - This function is used to get all employees.
 * It will return all employees in the database.
 * @param req
 * @param res
 * @param next
 */

export const getAllEmployees = (req, res, next) => {
    Employee.find()
        .then((result) => {
            res.status(201).json({
                message: "Employees fetched successfully!",
                result,
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err.message,
            });
        });
};

/**
 * @description - This function is used to add new employee.
 * It will create a new employee and save it to the database. It will return the new employee.
 * @param req
 * @param res
 * @param next
 */
export const addEmployee = (req, res, next) => {
    try {
        const {
            firstName,
            lastName,
            birthDate,
            address,
            contactNumber,
            department,
            designation,
            employeeId,
            nic,
        } = req.body;

        const employee = new Employee({
            firstName,
            lastName,
            birthDate,
            address,
            contactNumber,
            department,
            designation,
            employeeId,
            nic,
        });

        employee.save().then((result) => {
            res.status(201).json({
                message: "Employee added successfully!",
                result,
            });
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
};

/**
 * @description - This function is used to update employee.
 * It will update the employee in the database. It will return the updated employee.
 * @param req
 * @param res
 * @param next
 */
export const updateEmployee = async (req, res, next) => {
    try {
        const {
            id,
            firstName,
            lastName,
            address,
            contactNumber,
            department,
            designation,
            employeeId,
            nic,
            birthDate
        } = req.body;



        const employee = await Employee.findOneAndUpdate(
            { _id: id },
            {
                firstName,
                lastName,
                birthDate,
                address,
                contactNumber,
                department,
                designation,
                employeeId,
                nic,
            }
        );

        res.status(201).json({
            message: "Employee updated successfully!",
            employee,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
};

/**
 * @description - This function is used to delete employee.
 * It will delete the employee from the database. IT will return the deleted employee.
 * @param req
 * @param res
 * @param next
 */
export const removeEmployee = (req, res, next) => {
    const { id } = req.body;

    if (!id) {
        res.status(400).json({
            error: "Please provide an id!",
        });
    }

    Employee.findOneAndRemove({ _id: id })
        .then((result) => {
            res.status(201).json({
                message: "Employee removed successfully!",
                result,
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err.message,
            });
        });
};
