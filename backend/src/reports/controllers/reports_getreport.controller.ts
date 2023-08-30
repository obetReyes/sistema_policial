import { Response } from "express";
import { tryCatch, CustomReq, CustomError, redis } from "../../utils";
import { getReportService } from "../services/reports.service";

export const getReportController = tryCatch(
  async (req: CustomReq, res: Response) => {
    const { reportId } = req.params;
    // Check if report data already exists in cache
    const cachedReport = await redis.get(`report:${reportId}`);
    if (cachedReport) {
      const response = {
        message: JSON.parse(cachedReport),
      };
      return res.status(200).json(response);
    }

    const getReport = await getReportService({
      id: Number(reportId),
    });
    if (req.role  == "OFFICER" && getReport?.userName !== req.user) {
        throw new CustomError(
          "el reporte no se puede obtener debido a que el reporte no le pertence al oficial",
          "",
          401
        );
      
    }

    if (getReport == undefined) {
      throw new CustomError("el reporte no existe", "", 404);
    }else{
 // Store report data in cache for future requests
 await redis.set(`report:${reportId}`, JSON.stringify(getReport), "EX", 300); //cached for 5 minutes

 const response = {
   message: getReport,
 };
    
    return res.status(200).json(response);
  }
  }
);
