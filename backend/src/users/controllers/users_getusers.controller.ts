import { Request,Response } from "express";
import { prisma, tryCatch } from "../../utils";
import { getAllUsersService } from "../services/users.service";


interface UsersResI{
  id: number
  createdAt: Date
  updatedAt: Date
  name: string
  role: string
  group?:string | null
  reports?: number
  summaries?: number
}

export const getUsersController = tryCatch(
    async (req: Request, res: Response) => {
      const limit = req.query.limit ?? 100;
      const starting_after = req.query.starting_after ?? 0;

        const users = await getAllUsersService({
          skip:Number(starting_after),
          take:Number(limit)
        });
        
        const usersFiltered = users.map(user => {
          const usersFilteredData: UsersResI = {
            id:user.id,
            name:user.name,
            role:user.role,
            group:user.groupName,
            updatedAt:user.updatedAt,
            createdAt:user.createdAt
          };

          if(user.role == "OFFICER"){
            usersFilteredData.reports =  user._count.reports;
          }
          if(user.role == "DISPATCHER"){
            usersFilteredData.summaries =  user._count.summaries;
            
          }
          return usersFilteredData;
        });

        const records = await prisma.user.count();

        const response ={
          message: usersFiltered,
          limit: limit,
          records:records,
          starting_after: starting_after
         };
  
         return res.status(200).json(response);
        }
);