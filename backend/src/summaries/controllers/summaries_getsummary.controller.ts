import { Response } from "express";
import { tryCatch,CustomReq, CustomError } from "../../utils";
import { getSummaryService } from "../services/summaries.service";
import { redis } from "../../utils";
export const getSummaryController = tryCatch(
    async(req:CustomReq, res:Response) => {
        const {summaryId} = req.params;
        const getSummary = await getSummaryService({
            id:Number(summaryId)
        });
        if(getSummary == null){
            throw new CustomError("el sumario no existe", "", 404);
        }

        await redis.set(`report:${summaryId}`, JSON.stringify(getSummary), "EX", 300); //cached for 5 minutes


        const response = ({
            message:getSummary
        });

        return res.status(200).json(response);
    }
);