import { Request, Response } from "express";
import { tryCatch, CustomError } from "../../utils";
import bcrypt from "bcrypt";
import jwt, {Algorithm} from "jsonwebtoken";
import { getUsernameIPkey, limiterConsecutiveFailsByUsernameAndIP, limiterSlowBruteByIP, maxConsecutiveFailsByUsernameAndIP ,maxWrongAttemptsByIPperDay } from "../../utils";
import {updateTokenService } from "../services/auth.services";
import { getUserService } from "../../users";
//signin controller is used to logIn an user in the app using jwt rotation tokens.

export const signInController =tryCatch(
    async (req: Request, res: Response) => {
  
      // request cookie to check  if the request already contains a cookie 
      const cookies = req.cookies;
  
      const { username, password } = req.body;
      //req ip to check prevent brute force attack  https://github.com/animir/node-rate-limiter-flexible/wiki/Overall-example#login-endpoint-protection
      const ipAddr = req.ip;     // Block for 1 day, if 15 wrong attempts per day
      const usernameIPkey = getUsernameIPkey(req.body.username, ipAddr); // to check  the number of consecutive failed attempts and allows maximum 20 by username and IP per hour
  
  
     // we need to take the  information from these methods which are imported from the bruteForceLimiter util
      const [resUsernameAndIP, resSlowByIP] = await Promise.all([
        limiterConsecutiveFailsByUsernameAndIP.get(usernameIPkey),
        limiterSlowBruteByIP.get(ipAddr),
      ]);
    
      //retry secs works as timer it will return the time when the user is allowed to try to login again via headers.
      let retrySecs = 0;
      let headers;
  
    
      // Check if the client is already blocked by ip
      if (resSlowByIP !== null && resSlowByIP.consumedPoints >= maxWrongAttemptsByIPperDay) {
     
        retrySecs = Math.round(resSlowByIP.msBeforeNext / 1000) || 1; 
         headers = {
          "Retry-After": retrySecs,
          "X-RateLimit-Limit": limiterSlowBruteByIP.points,
          "X-RateLimit-Remaining":resSlowByIP?.remainingPoints,
        };
  //if is not arealdy blocked by ip check if the login attempt is blocked by username and ip.
      } else if (resUsernameAndIP !== null && resUsernameAndIP.consumedPoints >= maxConsecutiveFailsByUsernameAndIP) {
        
        retrySecs = Math.round(resUsernameAndIP.msBeforeNext / 1000) || 1;

        //headers to send ti fthe response
        headers = {
          "Retry-After": retrySecs,
          "X-RateLimit-Limit": limiterConsecutiveFailsByUsernameAndIP.points,
          "X-RateLimit-Remaining":resUsernameAndIP.remainingPoints,
        };
      }
  
      // if the timer is active it means the user failed his attemmp to login and we set the headers
      if (retrySecs > 0) {
      
        res.set(headers);
        throw new CustomError(`se ha intentado muchas veces ingresar y has introducido credenciales invalidas, por favor intentarlo en ${String(retrySecs)} segundos`, "", 429);
      }
    // if everything goes fine
      const signInOfficer = await getUserService({
          name: username
    
      });
  
      if (signInOfficer == null) {
        res.set(headers);
        throw new CustomError(
          "las credenciales son invalidas",
          "",
          401
        );
      }
  
      //get the password from the user found
      const storedPwd = signInOfficer.password;
  
      const pwdMatches = await bcrypt.compare(password, storedPwd);
      

      //check if passwords matches
      if (pwdMatches) {
        
        const accessToken = jwt.sign(
          { info: {username: signInOfficer.name, role:signInOfficer.role} },
          process.env.ACCESS_TOKEN_SECRET as string,
          { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION, algorithm: process.env.JWT_ALGORITHM as Algorithm}
        );

        console.log(process.env.ACCESS_TOKEN_SECRET);
        const newRefreshToken = jwt.sign(
          { info:{username: signInOfficer.name, role:signInOfficer.role} },
          process.env.REFRESH_TOKEN_SECRET as string,
          { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION, algorithm:process.env.JWT_ALGORITHM as Algorithm }
        );
   
        const cookieInReq = signInOfficer.token.filter((token:string) => token != cookies.jwt);
  
       
        //arrray of tokens

      !cookies.jwt ?  await updateTokenService({
          data:{
            token:{
              push:newRefreshToken
            }
          },where:{
            name:signInOfficer.name
          }
        })
        : await updateTokenService({
          data:{
            token:[...cookieInReq, newRefreshToken]
          },
          where:{
            name:signInOfficer.name
          }
        });
  
      
      
  //when the user login sucessfully reset the attempts for failed username and ip
    if (resUsernameAndIP !== null && resUsernameAndIP.consumedPoints > 0) {
      // Reset on successful authorisation
      await limiterConsecutiveFailsByUsernameAndIP.delete(usernameIPkey);
    }  //secure cookie set to false only in development mode not production
        res.cookie("jwt", newRefreshToken,{ httpOnly: true, secure: true, sameSite: "none", maxAge: 24 * 60 * 60 * 1000 });
        res
          .status(201)
          .json(
            {message:{
            token:accessToken,
            role:signInOfficer.role   
            }
          }
          );
  
          res.end();
          
      } else {
       // Consume 1 point from limiters on wrong attempt and block if limits reached
        const promises = [limiterSlowBruteByIP.consume(ipAddr)];
       
           // Count failed attempts by Username + IP only for registered users
        promises.push(limiterConsecutiveFailsByUsernameAndIP.consume(usernameIPkey));
  
  
  
        Promise.all(promises);
        const headers = {
            "Retry-After": retrySecs,
            "X-RateLimit-Limit": limiterConsecutiveFailsByUsernameAndIP.points,
            "X-RateLimit-Remaining":resUsernameAndIP?.remainingPoints,
          
        };
       res.set(headers);
        throw new CustomError(
          "las credenciales son invalidas",
          "",
          401
        );
      }
    }
  );
  
