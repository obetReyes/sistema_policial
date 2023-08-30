import {Request, Response, NextFunction} from "express";
import { redis } from "../utils";

export const cache =  (param:string) => {
return (req:Request, res:Response, next:NextFunction) => {
    redis.get(param, (error, result) => {
        if (error) {throw error;}
        if (result !== null) {
          return res.json(JSON.parse(result!));
        } else {
          return next();
        }
      });
    };
};

