import { Request, Response } from "express";
import { tryCatch } from "../../utils";
import { createGroupService } from "../services/groups.service";

export const createGroupController = tryCatch(
  async (req: Request, res: Response) => {
    const { name, area } = req.body;
    const createGroup = await createGroupService({
      name: name,
      area: area,
    });

    res.status(201).json({
      message: createGroup,
    });
  }
);
