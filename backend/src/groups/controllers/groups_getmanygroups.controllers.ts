import {Request, Response} from "express";
import { tryCatch, prisma } from "../../utils";
import { getManyGroupsService } from "../services/groups.service";
export const getManyGroupsController = tryCatch(
    async (req: Request, res: Response) => {
        const  group = req.query.group;
        const limit = req.query.limit ?? 100;
        const starting_after = req.query.starting_after ?? 0;

        const  groups = await getManyGroupsService({
            where:{
                name:{
                    contains:String(group)
                }
            },
            skip:Number(starting_after),
            take:Number(limit)
        });

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

        const records = await prisma.group.count({
            where:{
                name:{
                    contains:String(group)
                }
            }
        });
        const response = {
            message:groupsWithUsers,
            limit: limit,
            starting_after: starting_after,
            records:records,
        };

        return res.status(200).json(response);
    }
);