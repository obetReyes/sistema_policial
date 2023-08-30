import {Request,Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface customReq  extends Request{
    user?:string
    role?:string
}

export const verifyJwt = (req:customReq, res:Response, next:NextFunction) => {
    const JwtToken = req.cookies["jwt"];
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader ) {
       
        return res.status(403).json(
            {errrorCode:403, messsage:"el token de autorizacion es requerido", "href":"https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403"});  
    }
    const token = (authHeader as string).split(" ")[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (err: any, decoded:any) => {
            if (err || !JwtToken) {
                return res.status(403).json(
                    {errorCode:403, message:"el token de autorizacion es invalido o ah expirado", href:"https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/40"});            
            } 
        
            //invalid token
            req.user = decoded.info.username;
            req.role = decoded.info.role;
            next();
        }
    );
}
;
