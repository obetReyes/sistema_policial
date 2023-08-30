import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts";
import { GlobalResI } from "../helpers";
import { AxiosError } from "axios";
import { axiosPrivate } from "../helpers";

export const useSignOutMutation = () => {
    const navigate = useNavigate();

    const {setUser, setRole, setToken, persist} = useContext(UserContext);
    const {mutate} = useMutation<GlobalResI, AxiosError>(async():Promise<GlobalResI> => {
        const {data} = await axiosPrivate.get<GlobalResI>("/auth/signout");
        return data
    },{
        cacheTime:0,
        onSuccess:(variables) => {
            console.log(variables)
            setUser(false)
            setToken("")
            setRole("")
            persist ? localStorage.removeItem("persist") : null
            navigate("/", {
                replace:true
            });
        },
        onError:(error) => {
            console.log(error);
            setUser(false)
            setToken("")
            persist ? localStorage.removeItem("persist") : null
            navigate("/", {
                replace:true
            });
        },
    })
    return{
        mutate
    }
}