import { Request, Response } from "express";
import { CustomError, tryCatch } from "../../utils";
import { updateGroupService } from "../services/groups.service";

export const updateGroupController = tryCatch(
    async (req: Request, res: Response) => {
        const { name, newName, area } = req.body;
        if(name  === newName){
            throw new CustomError("el nuevo nombre del grupo no puede ser igual al nombre actual del grupo", "", 400);
        }
        const updateGroup = await updateGroupService({
            data: {
                name: newName,
                area: area,
            },
            where: {
                name: name
            }
        });
        res.status(200).json(
          
                {
                message: updateGroup
                }
            
        );
    }
);