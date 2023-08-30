import {Request, Response, NextFunction} from "express";
import { CustomError } from "../utils";


interface customReq  extends Request{
    user?:string
    role?:string
}


export const verifyRoles = (...allowedRoles:string[]) => {
    
    return (req:customReq, res:Response, next:NextFunction) => {

        if (!req?.role) {
        throw new CustomError("no se han asignado roles de autorizacion", "", 401);
    }


        const rolesArray = [...allowedRoles];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if(rolesArray.includes(req.role)){
            next();
        }else{
            throw new CustomError("el rol de autorizacion no permite el acceso a estos recursos", "", 401);
        }
    };
};
