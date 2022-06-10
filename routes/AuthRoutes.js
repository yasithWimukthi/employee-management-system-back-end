import express from "express";
import {login, signUp} from "../controllers/AuthController.js";
import {userSignupValidator} from "../validators/index.js";

const router = express.Router();

/**
 * @description - This route is used to register to the system.
 */
router.post(
    "/signup",
    userSignupValidator,
    signUp);

/**
 * @description - This route is used to login to the system.
 */
router.post(
    "/login",
    login);

export default router;