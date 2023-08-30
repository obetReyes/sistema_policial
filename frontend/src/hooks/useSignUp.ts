import { useNavigate } from "react-router-dom";
import { SignUpI, GlobalResI  } from "../helpers";
import axios, { AxiosError } from "axios";
import { axiosPrivate, ErrorsI } from "../helpers";
import { useMutation } from "@tanstack/react-query";

export const useSignUpMutation = () => {
    const navigate = useNavigate();
  const { mutate, error, isError, isLoading, isSuccess } = useMutation<
    GlobalResI,
    AxiosError,
    SignUpI
  >(
    async (body: SignUpI): Promise<GlobalResI> => {
      const { data } = await axiosPrivate.post<GlobalResI>(
        "/auth/signup",
        body
      );
      return data;
    },
    {
      onSuccess: (variables) => {
        navigate("/", {
            replace:true
        });
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
