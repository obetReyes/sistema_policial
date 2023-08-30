import express from "express";
import { cache, validator, verifyJwt, verifyRoles } from "../middlewares";
import { reportParamsValidator,  reportValidator,
     roles, createLimiter, getLimiter, reportQueryValidator } from "../utils";
import { createReportController, getManyReportsController, getReportController, getReportsController } from "./controllers";


export const router = express.Router();

router.get("/report/:reportId", getLimiter, verifyJwt, verifyRoles(roles.OFFICER, roles.DISPATCHER, roles.OPERATOR),validator(reportParamsValidator), cache("reportId"),  getReportController);
router.post("/", createLimiter, verifyJwt, verifyRoles(roles.OFFICER), validator(reportValidator), createReportController);
router.get("/", getLimiter, verifyJwt, verifyRoles(roles.OFFICER, roles.OPERATOR, roles.DISPATCHER), validator(reportQueryValidator), getReportsController);
router.get("/many",getLimiter, verifyJwt, verifyRoles(roles.DISPATCHER, roles.OFFICER, roles.OPERATOR),  validator(reportQueryValidator), getManyReportsController);
