import { Request, Response } from "express";
import { tryCatch } from "../../utils";
import bcrypt from "bcrypt";
import { CustomError } from "../../utils";
import { createUserService } from "../../users";
import { getGroupService } from "../../groups";
import { Role } from "@prisma/client";

export const createUserController = tryCatch(
    async (req: Request, res: Response) => {
        const { username, password, cuip, group, role} = req.body;
        const pwdToStore = await bcrypt.hash(password, 10);  
  
        if(role == "OFFICER" && !group){
          throw new CustomError("los oficiales necesitan ser asignados a un grupo", "400");
      }
      if (!Object.values(Role).includes(role) && role !== "OPERATOR") {
        // Do stuff here   
        throw new CustomError("el rol que se trate de asignar no puede ser asignado a un oficial o a un emisario", "400");
    }


        const isGroup = role == "OFFICER" && await getGroupService({
         name:group
        });
     
        if(!isGroup  && role == "OFFICER"){
            throw new CustomError("el grupo al cual el oficial se trata de asignar no existe", "400");
        }
      



      const signUpUser = role == "OFFICER" && isGroup ? 
        await createUserService({
          name: username,
          password: pwdToStore,
          role:role,
          cuip:cuip,
          group:{
            connect:{
              name:group
            }
          }
        })
        :
          await createUserService({
            name: username,
            password: pwdToStore,
            role:role,
            cuip:cuip,
        });
    
  

        const filteredUserResponse = {
          id:signUpUser.id,
          name:signUpUser.name,
          role:signUpUser.role,
          cuip:signUpUser.cuip,
          createdAt:signUpUser.createdAt,
          group:signUpUser.groupName
      };


      res
        .status(201)
        .json({
            message: filteredUserResponse
        });
      }
);