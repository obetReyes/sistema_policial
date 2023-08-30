import {useState, useEffect} from "react";
import { useRecordUpdateMutation, useRecords } from "../../../hooks";
import {
  UpdateUserI,
  updateUserSchema,
  ErrorsI,
  UserResI,
  GroupsResI
} from "../../../helpers";
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {useQueryClient} from "@tanstack/react-query"
interface Props{
  userId:string
  role:string
  
} 

export const UserUpdateModal = ({userId, role}:Props) => {
  const { mutate, error, isError, isLoading, isSuccess } =
    useRecordUpdateMutation<UserResI, UpdateUserI>("users", userId);
    const {
      currentPage: currentPageAll,
      setCurrentPage: setCurrentPageAll,
      recordsQuery,
    } = useRecords<GroupsResI>("groups");
    
    const [isModal, setIsModal] = useState<boolean>(false);
    const client = useQueryClient()
    const [currentRole, setCurrentRole] = useState<string>(""); // Add a state to hold the current role
    useEffect(() => {// Move the setValue call inside the useEffect hook
      setCurrentRole(role);
    }, []);

  
  
    const {
      register,
      handleSubmit,
      reset,
      setValue,
      formState: { errors },
    } = useForm<UpdateUserI>({
      mode: "onSubmit",
      resolver: yupResolver(updateUserSchema),
    });

  

    const onSubmit = handleSubmit(async (data, e) => {
      setValue("username", userId)
      mutate(data, {
        onSettled: () => {
          reset();
        },
          onSuccess:() =>{
            client.refetchQueries(["record", "users", userId])
            client.refetchQueries(["records", "users"])
            setIsModal(false);
          }

      });
    });


    const inputStyles =
    "w-full rounded-lg rounded-sm border-gray-300 p-4 pr-12 text-sm text-warning shadow-sm focus:border-zinc-800 focus:ring-transparent";
  const errorStyles = "absolute  text-sm  text-error font-semibold underline";
  return(
    <>
    <label htmlFor="myModalUpdateUser" className="btn" onClick={() => setIsModal(true)}>
     modificar agente
    </label>
    {isModal &&
<>
    <input type="checkbox" id="myModalUpdateUser" className="modal-toggle" />
    <div className="modal modal-bottom sm:modal-middle">
      <div className="modal-box relative">
        <label
          htmlFor="myModalUpdateUser"
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={() => {
            setIsModal(false)   
          reset()} 
          }>
          ✕
        </label>
        <h3 className="font-bold text-lg">modificar el agente</h3>
        <form  className="flex flex-col gap-10" onSubmit={onSubmit}>

        <div>
    <label htmlFor="functionInput" className="sr-only">Funcion</label>
  
  <div className="relative">
  <select
    id="functionInput"
      className="select select-bordered  w-full"
      placeholder="Funcion"
      autoComplete="off"
      {...register("role")}
      onChange={(e) => {
        
        setCurrentRole(e.target.value)

      }}
     > 
      {role != "OPERATOR" &&  <option value="OPERATOR">Operador</option>}

      {role != "DISPATCHER" &&  <option value="DISPATCHER">Operador 911</option>}
      {role !=  "OFFICER" && <option value="OFFICER">Oficial</option>}
    </select>
    </div>
    {errors.role ? <p className={errorStyles}>{errors.role?.message}</p> : null}
    </div>
        {currentRole  == "OFFICER"  && 
         <div>
         <label htmlFor="officerGroupInput" className="sr-only">Grupo</label>
       
       <div className="relative">
       <select
         id="officerGroupInput"
           className="select select-bordered  w-full"
           placeholder="grupo"
           autoComplete="off"
           {...register("group")}
          > 
           {recordsQuery.data?.message.map((group) => {
             return(
               <option key={group.id} value={group.name} >{group.name}</option>
             )
           })}
         </select>
         </div>
         {errors.group ? <p className={errorStyles}>{errors.group?.message}</p> : null}
         </div>
        }
            
          {isLoading ? <span className="loader"></span> :

    <input  className=" btn float-right" type='submit'value="actualizar agente"/>
  }
  {isError ? <p className="   text-sm  !mt-0 !mb-0    text-error font-semibold underline">{`${(error as ErrorsI).response.data.message}`}</p> : null}
        </form>
      </div>
    
    </div>
    </>
  }
  </>
  )
};
