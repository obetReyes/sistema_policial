import { Request, Response } from "express";
import { prisma, tryCatch } from "../../utils";
import { getGroupsService } from "../services/groups.service";

export const getGroupsController = tryCatch(
    async (req: Request, res: Response) => {
      const limit = req.query.limit ?? 100;
      const starting_after = req.query.starting_after ?? 0;

        const groups = await getGroupsService(
          {
            skip:Number(starting_after),
            take:Number(limit),
          }
        );
        
        const groupsWithUsers = await Promise.all(groups.map(async(group) => {
          const users = await prisma.user.count({
            where:{
              groupName:group.name
            }
          });
          return {
            id: group.id,
            area: group.area,
            name:group.name,
            createdAt: group.createdAt,
            updatedAt:group.updatedAt,
            users: users
          };
        }));
  
        const records = await prisma.group.count();

       const response ={
        message: groupsWithUsers,
        limit: limit,
        records:records,
        starting_after: starting_after
       };

       return res.status(200).json(response);
    }
);