import { useContext } from "react";
import { SignInI, SignInResI} from "../helpers";
import axios, { AxiosError } from "axios";
import { axiosPrivate, ErrorsI } from "../helpers";
import { UserContext } from "../contexts";
import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
export const useSignInMutation = () => {
  const { setUser, setRole, setToken, setIsUserFristTime} = useContext(UserContext);
  const [cookies, setCookie] = useCookies(["user"]);
  const { mutate, error, isError, isLoading, isSuccess } = useMutation<
    SignInResI,
    AxiosError,
    SignInI
  >(
    async (body: SignInI): Promise<SignInResI> => {
      const { data } = await axiosPrivate.post<SignInResI>(
        "/auth/signin",
        body
      );
      return data;
    },
    {
      onSuccess: (variables) => {
        setUser(true);
        setToken(variables.message.token);
        setRole(variables.message.role);
        if(!cookies.user){
          setCookie("user", `user has logged in the system ${new Date().toDateString()}`);
          setIsUserFristTime(true)
        }else{
          setIsUserFristTime(false)
        }

    
      },
      onError: (error) => {
        if (axios.isAxiosError<ErrorsI, Record<string, unknown>>(error)) {
          error.message = String(error.message);
          // Do something with this error...
        }
        if (error.code == "ERR_NETWORK") {
          error.message = "no se pudo establecer conexion con el servidor";
        }
        return error.message;
      },
    }
  );
  return {
    mutate,
    error,
    isError,
    isLoading,
    isSuccess,
  };
};
