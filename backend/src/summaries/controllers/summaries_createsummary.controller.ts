import { Response } from "express";
import { tryCatch, CustomReq } from "../../utils";
import { createSummaryService } from "../services/summaries.service";

export const createSummaryController = tryCatch(
  async (req: CustomReq, res: Response) => {
    const { callTime, incident, requestor, notes, location, phone } = req.body;

    const createSummary = await createSummaryService({
      user: {
        connect: {
          name: req.user,
        },
      },
      callTime: callTime,
      incident: incident,
      requestor: requestor,
      notes: notes,
      location: location,
      phone: phone,
    });
    res.status(201).json({
      message: createSummary,
    });
  }
);
