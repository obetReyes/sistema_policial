import { Request } from "express";

export interface CustomReq extends Request {
  user?:string
  role?:string
}

export default CustomReq;