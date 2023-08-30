import { Request, Response } from "express";
import { tryCatch, CustomError } from "../../utils";
import { getManyReportsService } from "../services/reports.service";
import { prisma } from "../../utils";

interface CustomReq  extends Request{
  user?:string
  role?:string
}
export const getManyReportsController = tryCatch(
  async (req: CustomReq, res: Response) => {
    const officer = req.query.officer;
    const event = req.query.event;
    const limit = req.query.limit ?? 100;
    const starting_after = req.query.starting_after ?? 0;


    const reports = async() => {
      if(req.role == "OFFICER" && event){
        return await getManyReportsService({
          where:{
            event:{
              contains:String(event)
            },
            userName:req.user
          },
          skip:Number(starting_after),
          take:Number(limit)
        });
      }
      if(req.role == "OFFICER" && officer){
        return await getManyReportsService({
          where:{
            userName:req.user
          },
          skip:Number(starting_after),
          take:Number(limit)
        });
      }
      if(event && req.role !== "OFFICER"){
        return  await getManyReportsService({
          where: {
            event: {
              contains: String(event),
            },
          },
          skip: Number(starting_after),
          take: Number(limit),
        });
      }
      if(officer && req.role !== "OFFICER"){
        return await getManyReportsService({
           where: {
             userName: {
               contains: String(officer),
             },
           },
           skip: Number(starting_after),
           take: Number(limit),
         });
       }

       if(!officer && !event){
        throw new CustomError(
          "no fue proveido nigun parametro de busqueda por favor agrega el parametro officer o event",
          "",
          400
        );
       }
    };
    if (officer && event) {
      throw new CustomError(
        "no se puede hacer una busqueda de reportes  por oficial y por evento al mismo tiempo",
        "",
        400
      );
    }
    

    const records = event && req.role !== "OFFICER"
      ? await prisma.report.count({
          where: {
            event: {
              contains: String(event),
            },
          },
        })
      : event && req.role == "OFFICER"  ?
      await  prisma.report.count({
        where:{
          event:{
            contains:String(event)
          },
          userName:req.user
        },
      })
      :officer
      ? await prisma.report.count({
          where: {
            userName: {
              contains: String(officer),
            },
          },
        })
      : 0;
    
    
    const reportsArray = await reports();
    const response = {
      message: reportsArray,
      limit: Number(limit),
      records: records,
      starting_after: Number(starting_after),
    };
    return res.status(200).json(response);
  }
);
