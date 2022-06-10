import express from "express";
import {addEmployee, getAllEmployees, removeEmployee, updateEmployee} from "../controllers/EmployeeController.js";
import {employeeValidator} from "../validators/index.js";

const router = express.Router();

/**
 * @description - This route is used retrieve all employees from the database.
 */
router.get("/get-all", getAllEmployees)

/**
 * @description - This route is used to add an employee to the database.
 */
router.post("/add", employeeValidator,addEmployee)

/**
 * @description - This route is used to remove an employee from the database.
 */
router.post('/update',employeeValidator,updateEmployee)

/**
 * @description - This route is used to remove an employee from the database.
 */
router.post('/delete',removeEmployee)

export default router;