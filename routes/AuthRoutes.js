import express from "express";
import {login, signUp} from "../controllers/AuthController.js";
import {userSignupValidator} from "../validators/index.js";

const router = express.Router();

router.post(
    "/signup",
    userSignupValidator,
    signUp);

router.post(
    "/login",
    login);

export default router;