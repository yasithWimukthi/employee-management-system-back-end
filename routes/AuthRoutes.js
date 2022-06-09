import express from "express";
import {login, signUp} from "../controllers/AuthController";
import {userSignupValidator} from "../validators";

const router = express.Router();

router.post(
    userSignupValidator,
    "/signup",
    signUp);

router.post(
    "/login",
    login);

export default router;