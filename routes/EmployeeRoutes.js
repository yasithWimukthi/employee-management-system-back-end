import express from "express";
import {addEmployee, getAllEmployees, removeEmployee, updateEmployee} from "../controllers/EmployeeController.js";
import {employeeValidator} from "../validators/index.js";

const router = express.Router();

router.get("/get-all", getAllEmployees)

router.post("/add", employeeValidator,addEmployee)

router.post('/update',employeeValidator,updateEmployee)

router.post('/delete',removeEmployee)

export default router;