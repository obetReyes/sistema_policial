import {redis} from "../index";
import { RateLimiterRedis } from "rate-limiter-flexible";





// 40 and 20 only in dev mode change it to 5 in username and ip and in ip per day to 10
export const maxWrongAttemptsByIPperDay =  6;
export const maxConsecutiveFailsByUsernameAndIP = 3;

export const limiterSlowBruteByIP = new RateLimiterRedis({
    storeClient: redis,
    keyPrefix: "login_fail_ip_per_day",
    points: maxWrongAttemptsByIPperDay, // 40 wrong attemps by ip per day
    duration:60*60*24 , 
    blockDuration:  60 * 60 * 24, // Block for 1 day, if 10 wrong attempts per day
  });
  
export const limiterConsecutiveFailsByUsernameAndIP = new RateLimiterRedis({
    storeClient: redis,
    keyPrefix: "login_fail_consecutive_username_and_ip",
    points: maxConsecutiveFailsByUsernameAndIP,
    duration: 3600, // Store number for 1 hour since first fail
    blockDuration: 3600, // Block for 1 hour
});


export const getUsernameIPkey = (username:string, ip:string) => `${username}_${ip}`;