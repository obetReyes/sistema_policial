import { Request, Response } from "express";
import { tryCatch } from "../../utils";
import bcrypt from "bcrypt";

import { createUserService } from "../../users";

  export const signUpController  =tryCatch(
    async (req: Request, res: Response) => {
      const { username, cuip,password} = req.body;
      const pwdToStore = await bcrypt.hash(password, 10);
      const signUpOfficer = await createUserService({
        name: username,
        password: pwdToStore,
        role:"OPERATOR",
        cuip:cuip
      });
      res
        .status(201)
        .json({
              message: `nuevo operador central creado ${signUpOfficer.name}`,
            },
            
          );
    }
  );