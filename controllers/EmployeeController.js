import Employee from '../models/Employee.js';

const addEmployee = (req, res, next) => {
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
                message: 'Employee added successfully!',
                result,
            });
        });
    }catch (err) {
        res.status(500).json({
            error:err.message
        })
    }
}

con