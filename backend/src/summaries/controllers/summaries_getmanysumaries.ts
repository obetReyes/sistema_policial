import { Request, Response } from "express";
import { tryCatch, CustomError } from "../../utils";
import { getManySummariesService} from "../services/summaries.service";
import { prisma } from "../../utils";

export const getManySummariesController = tryCatch(
    async(req:Request, res:Response) => {
    const dispatcher = req.query.dispatcher;
    const incident = req.query.incident;
    const limit = req.query.limit ?? 100;
    const starting_after = req.query.starting_after ?? 0;


    const summaries = incident && dispatcher ? 
    await getManySummariesService(
        {
            where: {
                incident: {
                    contains: String(incident)
                },
                AND:{
                    userName: String(dispatcher)
                }
                
            },
            skip: Number(starting_after),
            take: Number(limit)
        }
    ):
    
    incident ? await getManySummariesService(
        {
            where: {
                
                incident: {
                    contains: String(incident)
                }
            },
            skip: Number(starting_after),
            take: Number(limit)
        }
    ) : dispatcher ? await getManySummariesService(
        {
            where: {
                userName: {
                    contains: String(dispatcher)
                }
            },
            skip: Number(starting_after),
            take: Number(limit)
        }
    ) :(() => {
        throw new CustomError(
          "no fue proveido nigun parametro de busqueda por favor agrega el parametro dispatcher o inicident",
          "",
          400
        );
      })();

    const records =  incident ? await prisma.summary.count({
        where:{
          incident:{
            contains:String(incident)
          }
        }
      }) : dispatcher ? await prisma.summary.count({
        where:{
            userName:{
                contains:String(dispatcher)
            }
        }
      }):  0;

      
    
      
    const response = {
        message:summaries,
        limit:limit,
        records:records,
        starting_after: starting_after
    };
    return res.status(200).json(response);
}
);