import { Request, Response } from "express";
import { CustomError, tryCatch } from "../../utils";
import { redis } from "../../utils";
import { getUserService } from "../services/users.service";
import { Location_Info } from "@prisma/client";
interface UserResI{
  id: number
  createdAt: Date
  updatedAt: Date
  name: string
  group: string | null
  role: string
  location: Location_Info | null
  reports?: number
  summaries?: number
}
export const getUserController = tryCatch(
  async (req: Request, res: Response) => {
    // username as parameter to get an user information
    const { username } = req.params;
    const getUser = await getUserService({
      name: username,
    });
    // if the user does not exists throw an 404 error
    if (getUser == null) {
      throw new CustomError("el sumario no existe", "", 404);
    }
    const getUserFilteredData:UserResI = {
      id: getUser.id,
      createdAt: getUser.createdAt,
      updatedAt: getUser.updatedAt,
      name: getUser.name,
      group: getUser.groupName,
      role: getUser.role,
      location: getUser.location,
    };
    if(getUser.role == "OFFICER"){
      getUserFilteredData.reports =  getUser._count.reports;
    }
    if(getUser.role == "DISPATCHER"){
      getUserFilteredData.summaries =  getUser._count.summaries;
      
    }
    await redis.set(
      `report:${username}`,
      JSON.stringify(getUserFilteredData),
      "EX",
      300
    ); //cached for 5 minutes
    const response = {
      message: getUserFilteredData,
    };

    return res.status(200).json(response);
  }
);
