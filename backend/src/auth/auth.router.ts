import express from "express";
import { signInController, signOutController, signUpController, tokenController } from "./controllers";
import { validator} from "../middlewares";
import {  signInValidator, signUpValidator } from "../utils";
import { tokenLimiter } from "../utils";
import { deleteLimiter, createLimiter, updateLimiter } from "../utils";
export const router = express.Router();
router.post("/signin", updateLimiter, validator(signInValidator), signInController);
router.post("/signup", createLimiter, validator(signUpValidator), signUpController);
router.get("/signout", deleteLimiter, signOutController);
router.get("/update-token",  tokenLimiter,  tokenController);
