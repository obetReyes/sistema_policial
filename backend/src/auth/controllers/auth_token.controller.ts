import { Request, Response } from "express";
import  jwt, {Algorithm}  from "jsonwebtoken";
import { tryCatch } from "../../utils";

import { CustomError } from "../../utils";
import { getUserService } from "../../users";
import { updateTokenService } from "../services/auth.services";



interface JwtPayload {
    info: {
        username:string
    }
  }


// you can generate a new access token (which stays for 15 min) if your current refresh token it's still valid the controller also  generates a new refresh token, its mean to use in the app cus obviously the app is intended to be used for more than 15min. remember that in refresh token and acess token strategy the acess token is used to make api calls or to request resources 
export const tokenController = tryCatch(async(req:Request, res:Response) => {
    const cookies = req.cookies;
    if(!cookies.jwt) 
    {throw new CustomError("el token de autorizacion no es valido","", 401);}
    const token = cookies.jwt;
    const decodeToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string) as JwtPayload;
    const foundUser = await getUserService({
            name:decodeToken.info.username
    });
    
    if(!foundUser){
        jwt.verify(
            token,
            process.env.REFRESH_TOKEN_SECRET as string,
           // eslint-disable-next-line @typescript-eslint/no-explicit-any
            async(err:any, decoded:any) => {
                if(err){
                    throw new CustomError("el token de autorizacion no es valido", "", 403);
                }
                //if the token is stolen  the next function will invalid the token deleting it 
                await updateTokenService({
                    where:{
                        name:decoded.info.username
                    },
                    data:{
                        token:[]
                    }
                });
            }
        );
        throw new CustomError("el token de autorizacion no es valido", "", 403);
    }

    

    //this function generates a new token array to check if the cookie is not already in the user records and adds it to the users tokens


    const newRefreshTokenArray = foundUser.token.filter((rt: unknown) => rt !== cookies.jwt);
    jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET as string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async(err:any, decoded:any) => {
            //if the token for some reason is already in the db we wont add the token to the db and we will stay with the ones that we already had
            if(err){
                await updateTokenService({
                    data:{
                        token:[...newRefreshTokenArray]
                    },
                    where:{
                        name:foundUser.name
                    }
                });
            }
            if(err || foundUser.name !== decoded.info.username){
                throw new CustomError("el token de autorizacion no es valido", "", 403);
            }
            const accessToken = jwt.sign(
                {info:{username:decoded.info.username, role:decoded.info.role}},
                process.env.ACCESS_TOKEN_SECRET as string,
                {expiresIn:process.env.ACCESS_TOKEN_EXPIRATION, algorithm:process.env.JWT_ALGORITHM as Algorithm}
            );
            const newRefreshToken = jwt.sign(
                {info:{username:decoded.info.username, role:decoded.info.role}},
                process.env.REFRESH_TOKEN_SECRET as string,
                {expiresIn:process.env.REFRESH_TOKEN_EXPIRATION, algorithm:process.env.JWT_ALGORITHM as Algorithm} 
            );

            //if everything goes ok we will merge the current refresh token with the other ones generated in other devices
            await updateTokenService({
                data:{
                    token:[...newRefreshTokenArray, newRefreshToken]
                },
                where:{
                    name:foundUser.name
                }
            });
            res.clearCookie("jwt"); //clear the cookie
            res.cookie("jwt",newRefreshToken,{ httpOnly: true, secure:true, sameSite: "strict", maxAge: 24 * 60 * 60 * 1000 }); //generate a new refresh.
            res.status(201).json({message:accessToken});
        }      
    );    
});