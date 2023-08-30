import { Response, Request, NextFunction } from "express";
import { CustomError } from "../utils";
import { Prisma } from "@prisma/client";
import jwt from "jsonwebtoken";


export const errorInterceptor = async(error:Error, req:Request, res:Response,next:NextFunction ) => {
    
    
    if(error instanceof CustomError){
        return res.status(error.statusCode ?? 400).json(
                {
                errorCode:error.statusCode ?? 400,
                message: error.message || "error desconocido",
                href:error.href
                }
            
        );
    }
    
    if (error instanceof Prisma.PrismaClientKnownRequestError){
        if (error.code === "P2002") {
            return res.status(409).json({
                    errorCode:409,
                    message:"las credenciales ya estan tomadas",
                    href:"https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409"
        });
        }

        if(error.code === "P2025"){
            return res.status(404).json({
                    errorCode:404,
                    message:"los datos no fueron encontrados",
                    href:"https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404"
        });
    }

    if(error instanceof jwt.JsonWebTokenError){
        return res.status(401).json(
            {
                errorCode:401,
                message:"el token  de autorizacion es invalido, la firma es invalida",
                href:"https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401"
    }
            
        );
    }
}
    if(error instanceof Prisma.PrismaClientUnknownRequestError){
        return res.status(400).json({
            errorCode:400,
            message:"error desconocido al trata de insertar invalidos en la base de datos",
            href:""
        });
    }
    if(error instanceof SyntaxError || error instanceof TypeError){
        return res.status(400).json(
            {
                errorCode:400,
                message:error.message,
                href:"https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400"
    }
    
);
    }

};

