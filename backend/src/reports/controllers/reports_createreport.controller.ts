import { Request, Response } from "express";
import { tryCatch, CustomReq} from "../../utils";
import { createReportService } from "../services/reports.service";

export const createReportController = tryCatch(
    async(req:CustomReq, res:Response) => {
        const {event, actions, summary} = req.body;
        const createReport = await createReportService({
            user:{
                connect:{
                    name:req.user
                }
            },
            event:event,
            actions:actions,
            summary:summary
        });

        res.status(201).json({
            message:createReport
            
        });
    }
);
