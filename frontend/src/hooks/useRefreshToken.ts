import axios from "../helpers/axios";
import { useContext } from "react";
import { UserContext } from "../contexts";
import { GlobalResI } from "../helpers";

const REFRESH_URL = "auth/update-token"
export const useRefreshToken  = () => {
    const {setToken, token} = useContext(UserContext)

    const refresh = async (): Promise<void> => {
        const res = await axios.get<GlobalResI>(REFRESH_URL,{withCredentials:true})
        setToken(res.data.message)
    }
    return refresh 

}


