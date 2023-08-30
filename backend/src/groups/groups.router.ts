import express from "express";
import { createGroupController, deleteGroupController, getGroupController, getGroupsController, getManyGroupsController, updateGroupController } from "./controllers";
import { validator, verifyRoles, cache, verifyJwt } from "../middlewares";
import { roles, groupValidator, groupParamsValidator, groupUpdateValidator } from "../utils";
import { getLimiter, createLimiter, updateLimiter, deleteLimiter } from "../utils";
export const router = express.Router();

router.post("/", createLimiter, verifyJwt, verifyRoles(roles.OPERATOR), validator(groupValidator), createGroupController);
router.get("/group/:groupId", getLimiter, verifyJwt ,cache("groupId"), getGroupController);
router.get("/", getLimiter, verifyJwt, getGroupsController);
router.put("/", updateLimiter, verifyJwt, verifyRoles(roles.OPERATOR), validator(groupUpdateValidator), updateGroupController);
router.delete("/:group", deleteLimiter, verifyJwt, verifyRoles(roles.OPERATOR), validator(groupParamsValidator), deleteGroupController);
router.get("/many",getLimiter, getManyGroupsController);


