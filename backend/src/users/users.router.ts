import express from "express";
import { cache, validator, verifyJwt, verifyRoles } from "../middlewares";
import { userValidator, roles, userUpdateValidator, useQueryValidator, userParamsValidator, getLimiter, updateLimiter, createLimiter, deleteLimiter } from "../utils";
import {
  getUserController,
  deleteUserController,
  getUsersController,
  updateUserController,
  getManyUsersController,
  createUserController,
} from "./controllers";

export const router = express.Router();



router.get("/", getLimiter, verifyJwt, verifyRoles(roles.OPERATOR, roles.DISPATCHER), getUsersController);


router.post("/", createLimiter, verifyJwt, verifyRoles(roles.OPERATOR), validator(userValidator), createUserController);

router.get(
  "/user/:username",
  getLimiter,
  verifyJwt,
  verifyRoles(roles.DISPATCHER, roles.OPERATOR, roles.OFFICER),
  validator(userParamsValidator),
  cache("username"),
  getUserController
);

router.put(
  "/",
  updateLimiter,
  verifyJwt,
  verifyRoles(roles.OPERATOR),
  validator(userUpdateValidator),
  updateUserController
);
router.delete(
  "/:username",
  deleteLimiter,
  verifyJwt,
  verifyRoles(roles.OPERATOR),
  validator(userValidator),
  deleteUserController
);
router.get("/many/", getLimiter, verifyJwt, verifyRoles(roles.OPERATOR, roles.DISPATCHER), validator(useQueryValidator), getManyUsersController);