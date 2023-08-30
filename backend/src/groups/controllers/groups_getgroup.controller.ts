import { Request, Response } from "express";
import { tryCatch } from "../../utils";
import { getGroupService } from "../services/groups.service";
import { CustomError } from "../../utils";
import { redis } from "../../utils";

export const getGroupController = tryCatch(
  async (req: Request, res: Response) => {
    const { groupId } = req.params;
    const cachedGroup = await redis.get(`group:${groupId}`);
    if (cachedGroup) {
      const response = {
        message: JSON.parse(cachedGroup),
      };
      return res.status(200).json(response);
    }
    const getGroup = await getGroupService({
     id:Number(groupId)
    });

    if (getGroup == undefined) {
      throw new CustomError("el grupo no existe", "", 404);
    }else{
  
      
      const userValues = getGroup.users.map(user => {
        return { name: user.name, reports: user._count.reports };
    });
    
    const { id, name, area, createdAt, updatedAt } = getGroup;

    const getGroupResponse = { id, name, area, createdAt, updatedAt, users: userValues, };
    await redis.set(`report:${groupId}`, JSON.stringify(getGroupResponse), "EX", 300); //cached for 5 minutes
    
      const response = {
        message:getGroupResponse,
      };
      return res.status(200).json(response);
    }
    // Store report data in cache for future requests


  }
);
