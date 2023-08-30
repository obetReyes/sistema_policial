import { Request, Response } from "express";
import { tryCatch, prisma } from "../../utils";
import { getManyUsersService } from "../services/users.service";


interface UsersResI{
    id: number
    createdAt: Date
    updatedAt: Date
    name: string
    role: string
    reports?: number
    summaries?: number
  }

  
export const getManyUsersController = tryCatch(
    async(req:Request, res:Response) => {
        const agents = req.query.agents;
        const limit = req.query.limit ?? 100;
        const starting_after = req.query.starting_after ?? 0;
    
        const users = await getManyUsersService({
           where:{
            name:{
                contains:String(agents)
            }
           },
           skip:Number(starting_after),
           take:Number(limit)
        });

        const usersFiltered = users.map(user => {
            const usersFilteredData: UsersResI = {
              id:user.id,
              name:user.name,
              role:user.role,
              updatedAt:user.updatedAt,
              createdAt:user.createdAt
            };
              usersFilteredData.reports =  user._count.reports;
              usersFilteredData.summaries =  user._count.summaries;
           
            return usersFilteredData;
          });

        const records = await prisma.user.count({
            where:{
                name:{
                    contains:String(agents)
                }
            }
        });

        const response = {
            message:usersFiltered,
            limit: limit,
            starting_after: starting_after,
            records:records,
        };

        return res.status(200).json(response);

    }
);