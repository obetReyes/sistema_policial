import { Request, Response } from "express";
import { tryCatch } from "../../utils";
import { getSummariesService } from "../services/summaries.service";
import { prisma } from "../../utils";

export const getSummariesController = tryCatch(
  async (req: Request, res: Response) => {
    const limit = req.query.limit ?? 100;
    const starting_after = req.query.starting_after ?? 0;

    const summaries = await getSummariesService({
      skip: Number(starting_after),
      take: Number(limit),
    });

    const records = await prisma.summary.count();
    const response = {
      message: summaries,
      limit: limit,
      starting_after: starting_after,
      records: records,
    };

    return res.status(200).json(response);
  }
);
