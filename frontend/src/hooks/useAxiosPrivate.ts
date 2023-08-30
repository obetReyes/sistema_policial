import { useEffect, useContext } from "react";
import { axiosPrivate } from "../helpers";
import { UserContext } from "../contexts";
import { useRefreshToken } from "./useRefreshToken";

export const useAxiosPrivate = () => {
    const refresh = useRefreshToken()
    const {token} = useContext(UserContext)
    useEffect(() => {
           
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                  
                }
                return config;
            }, (error) => {
                Promise.reject(error)
            }
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            
            response => response,
            async (error) => {
               
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    console.log("new acess",newAccessToken)
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [token, refresh])

    return axiosPrivate;
}
