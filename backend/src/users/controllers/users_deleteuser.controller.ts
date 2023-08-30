import { Request, Response } from "express";
import { tryCatch } from "../../utils";
import { deleteUserService } from "../services/users.service";

export const deleteUserController = tryCatch(
  async (req: Request, res: Response) => {
    const { username } = req.params;
    const deleteUser = await deleteUserService({
      name: username,
    });
    res.status(200).json({
      message: `el usuario ${deleteUser.name}  fue removido`,
    });
  }
);
