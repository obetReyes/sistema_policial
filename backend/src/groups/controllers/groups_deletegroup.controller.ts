import { Request, Response } from "express";
import { tryCatch } from "../../utils";
import { deleteGroupService } from "../services/groups.service";

export const deleteGroupController = tryCatch(
  async (req: Request, res: Response) => {
    const { group } = req.params;

    const deleteGroup = await deleteGroupService({
      name: group,
    });

    res.status(200).json({
      message: `el grupo ${deleteGroup.name}  ha sido removido`,
    });
  }
);
