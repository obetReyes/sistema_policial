import { tryCatch } from "../../utils";
import { Request, Response } from "express";
import { CustomError } from "../../utils";
import { getUserService, updateUserService } from "../services/users.service";
import { Role } from "@prisma/client";

interface customReq extends Request {
  user?: string;
  role?: string;
}

export const updateUserController = tryCatch(
  async (req: customReq, res: Response) => {
    const { group, username, role, password } = req.body;


    
    if (Object.values(Role).includes(role)) {
      const getUser = await getUserService({
        name: username,
      });

      if (getUser) {
        if (role == "OFFICER" && !group) {
          throw new CustomError(
            "un oficial no puede  quedarse sin grupo",
            "",
            400
          );
        }
        if (getUser.groupName == group && role == "OFFICER") {
          throw new CustomError(
            "el agente ya tiene asignado este grupo",
            "",
            400
          );
        }
        if ((role == "DISPATCHER" && group) || (role == "OPERATOR" && group)) {
          throw new CustomError(
            "un operador del 911 o un operador no puede ser asignado a un grupo",
            "",
            400
          );
        }
        let updateUser;
        if (role == "DISPATCHER" || role == "OPERATOR") {
          updateUser = await updateUserService({
            data: {
              role: role,
              password: password ? password : getUser.password,
              group: {
                disconnect: true,
              },
            },
            where: {
              name: username,
            },
          });
        }
        if (role == "OFFICER") {
          updateUser = await updateUserService({
            data: {
              role: role,
              password: password ? password : getUser.password,
              group: {
                connect: {
                  name: group,
                },
              },
            },
            where: {
              name: username,
            },
          });
        }
        const updateUserFilteredData = {
          id: updateUser?.id,
          createdAt: updateUser?.createdAt,
          updatedAt: updateUser?.updatedAt,
          name: updateUser?.name,
          group: updateUser?.groupName,
          role: updateUser?.role,
        };
        res.status(200).json({
          message: updateUserFilteredData,
        });
      }
    } else {
      throw new CustomError(
        "un rol inexistente, no puede ser asignado",
        "",
        400
      );
    }
  }
);
