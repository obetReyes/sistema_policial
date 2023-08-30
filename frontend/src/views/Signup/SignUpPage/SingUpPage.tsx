/* signup page  the form  is using yup validator and react hook form 
the page is used to create operators after the operator was successfully created the person who created the operator can signup via signin page
)
*/
import {useForm} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema, SignUpI, ErrorsI } from "../../../helpers";
import { useSignUpMutation } from "../../../hooks/useSignUp";
export const SingUpPage = () => {
  const {mutate, error, isError, isLoading} =  useSignUpMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpI>({
    mode: "onSubmit",
    resolver: yupResolver(signUpSchema),
  });
  
  const onSubmit = handleSubmit(async(data,e) => {
    mutate({username:data.username, password:data.password, cuip:data.cuip},
      {
        onSettled:() => {
          data.username = ""
          data.password = ""
          data.cuip = ""
          e?.target.reset()
          
          e?.target.reset
        }
      })
    
    e?.target.reset()
  })
 
   
 // common styles 
 const inputStyles = "w-full rounded-lg rounded-sm border-gray-300 p-4 pr-12 text-sm text-warning shadow-sm focus:border-zinc-800 focus:ring-transparent"
 const errorStyles = "absolute  text-sm  text-error font-semibold underline"


  return (
    <div className=" mx-auto flex flex-col  justify-center w-full h-screen px-4 py-16 sm:px-6 lg:px-8 ">
    <div>
    <div className="mx-auto max-w-xl text-primary-content">
      <h3 className="text-xl font-bold sm:text-3xl text-center">Registro Operador</h3>
    </div>
    
    <form action="" className="mx-auto mt-8 mb-0 max-w-md space-y-4" onSubmit={onSubmit}>
    <div className="pb-4">
        <label htmlFor="username" className="sr-only">Nombre De Usuario</label>
  
        <div className="relative">
          <input
          id="username"
            type="text"
            className={inputStyles}
            placeholder="Nombre De Usuario"
            {...register("username")} 
          />
  
         
        </div>
        {errors.username ? <p className={errorStyles}>{errors.username?.message}</p> : null}
      </div>

  
      <div className="pb-4">
        <label htmlFor="password" className="sr-only">Contraseña</label>
  
        <div className="relative">
          <input
          id="password"
            type="password"
            className={inputStyles}
            placeholder="Contraseña"
            {...register("password")}  autoComplete="off" 
          />
        </div>
        {errors.password ? <p className={errorStyles}>{errors.password?.message}</p> : null}
      </div>
  
      <div className="pb-4">
        <label htmlFor="password2" className="sr-only">Confirmar Contraseña</label>
  
        <div className="relative">
          <input
          id="password2"
            type="password"
            className={inputStyles}
            placeholder="Confirmar Contraseña"
            {...register("password2")}  autoComplete="off" 
          />
        </div>
        {errors.password2 ? <p className={errorStyles}>{errors.password2?.message}</p> : null}
      </div>

      <div className="pb-4">
        <label htmlFor="cuip" className="sr-only">CUIP</label>

        <div className="relative">
          <input
          id="cuip"
            type="text"
            className={inputStyles}
            placeholder="CUIP"
            {...register("cuip")}  autoComplete="off" 
          />
        </div>
        {errors.cuip ? <p className={errorStyles}>{errors.cuip?.message}</p> : null}
      </div>



      <div className="float-right">
      {isLoading ? <span className="loader"></span> : 
        <button
          type="submit"
          className="inline-block rounded-lg bg-base-200 hover:bg-base-300 px-5 py-3 text-sm font-medium "
        >
          crear operador
        </button>
      }
      </div>
      {isError ? <p  className={`${errorStyles} pt-12`}>{`${error?.response?.data ? (error as ErrorsI).response.data.message : error?.message}`}</p> : null}
    </form>
    

  </div>
  </div>
  )
}
