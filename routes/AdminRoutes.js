import express from "express";
import {addDepartment, getAllDepartments} from "../controllers/AdminController.js";


const router = express.Router();

/**
 * @description - This route is used retrieve all departments from the database.
 */
router.get('/get-all',getAllDepartments);

/**
 * @description - This route is used to add a department to the database.
 */
router.post(
    "/add-department",
    addDepartment);

export default router;