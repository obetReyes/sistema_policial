import { Request, Response } from "express";
import { tryCatch, prisma } from "../../utils";
import {
  getReportsService,
} from "../services/reports.service";

interface customReq extends Request {
  user?: string;
  role?: string;
}

// cambiar aqui en vez de pedir el officer pedir la cookie si la cookie es distinta a operator no poder pedir officer y bucar solo los datos del username del officer

export const getReportsController = tryCatch(
  async (req: customReq, res: Response) => {
    const limit = req.query.limit ?? 100;
    const starting_after = req.query.starting_after ?? 0;

    const reports =
      req.role == "OFFICER"
        ? await getReportsService({
            skip: Number(starting_after),
            take: Number(limit),
            where: {
              user: {
                name: String(req.user),
              
              },
            },

          })
        : await getReportsService({
            skip: Number(starting_after),
            take: Number(limit),
          });

    /* if  the officer name is found in the db we will send the response or if an officer name wasn't given all the reports will be sent ) */
          const records = req.role == "OFFICER" ? await prisma.report.count({
            where:{
              userName:req.user
            }
          }) : await prisma.report.count();
    const response = {
      message: reports,
      limit: limit,
      starting_after:starting_after,
      records:records

    };
    // if it does not work later change to send instead of json
    return res.status(200).json(response);
  }
);
