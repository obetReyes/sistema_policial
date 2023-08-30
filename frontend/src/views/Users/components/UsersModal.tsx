import {  GroupsResI,createUserI, createUserSchema, UserResI, CreateUserResI, ErrorsI} from '../../../helpers'
import { useRecords, useRecordMutation } from '../../../hooks'
import {useForm} from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import {useQueryClient} from "@tanstack/react-query"



interface Props{
  param:{}
}
export const UsersModal = ({param}:Props) => {

  const {mutate, error, isError, isLoading} = useRecordMutation<CreateUserResI, createUserI>("users", "FoundUsers");
  
  
  const [isOfficer, setIsOfficer] = useState<boolean>(false)
  const [isModal, setIsModal] = useState<boolean>(false);
  const client = useQueryClient()
  const {
    currentPage: currentPageAll,
    setCurrentPage: setCurrentPageAll,
    recordsQuery,
  } = useRecords<GroupsResI>("groups");
  

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createUserI>({
    mode: "onSubmit",
    resolver: yupResolver(createUserSchema),
  });

  const onSubmit = handleSubmit(async(data,e) => {
    
    if(isOfficer)
  {
    mutate({username:data.username, group:data.group, password:data.password, cuip:data.cuip, role:data.role},{
      onSettled:() => {
        data.username = ""
        data.group = ""
        data.cuip = ""
        data.password = ""
        data.password2 = ""
        data.role = ""
      },onSuccess:() => {
        if(Object.keys(param).length >=1)
          client.refetchQueries(["searchRecords", "FoundUsers", "users"])
        else{
          client.refetchQueries(["records", "users"])
        }
        setIsModal(false)
        }

      })
    
     }
     
     if(!isOfficer){
        mutate({
          username:data.username,
          cuip:data.cuip,
          password:data.password,
          role:data.role
        },{
          onSettled:() =>{
            data.username = ""
            data.cuip = ""
            data.password = ""
            data.password2 = ""
            data.role = ""
          },onSuccess:() => {
            if(Object.keys(param).length >=1)
              client.refetchQueries(["searchRecords", "FoundUsers", "users"])
            else{
              client.refetchQueries(["records", "users"])
            }
            setIsModal(false)
            }
        })
     }
     e?.target.reset()
     reset()
  }
  )
  
   // common styles 
 const inputStyles = "w-full rounded-lg rounded-sm border-gray-300 p-4 pr-12 text-sm text-warning shadow-sm focus:border-zinc-800 focus:ring-transparent"
 const errorStyles = "absolute  text-sm  !mt-0 !mb-0 text-error font-semibold underline"

  return (
    <>
<label htmlFor="myModalUsers" className="btn" onClick={() =>{ setIsModal(true) 
  reset()
  setIsOfficer(false)
  }}>crear Agente</label>
{isModal &&
<>
<input type="checkbox" id="myModalUsers" className="modal-toggle" />
<div className="modal modal-bottom sm:modal-middle">
  <div className="modal-box relative">
  <label htmlFor="myModalUsers" className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => {
    setIsModal(false)
    reset()
  }} >
          ✕</label>
    <h3 className="font-bold text-lg">Nuevo Agente</h3>
    <div className="modal-action">
    <form className='flex flex-col w-full gap-10' onSubmit={onSubmit}>
  <label htmlFor="name" className="sr-only">Nombre</label>
  <div>
  <div className="relative">
    <input
    id="name"
      type="text"
      className={inputStyles}
      placeholder="Nombre"
      autoComplete="off"
      {...register("username")}
     //register goes here
    />
  </div>
  {errors.username ? <p className={errorStyles}>{errors.username?.message}</p> : null}
  </div>

  <div>
  <label htmlFor="passwordInput" className="sr-only">Contraseña</label>
  
  <div className="relative">
    <input
    id="PasswordInput"
    type='password'
      className={inputStyles}
      placeholder="Contraseña"
      autoComplete="off"
      {...register("password")}
     //register goes here
    />
    </div>
    {errors.password ? <p className={errorStyles}>{errors.password?.message}</p> : null}
    </div>

  <div>
  <label htmlFor="confirmPasswordInput" className="sr-only">Confirmar Contraseña</label>
  
  <div className="relative">
    <input
    id="confirmPasswordInput"
    type='password'
      className={inputStyles}
      placeholder="Confirmar Contraseña"
      autoComplete="off"
      {...register("password2")}
     //register goes here
    />
    </div>
    {errors.password2 ? <p className={errorStyles}>{errors.password2?.message}</p> : null}
    </div>

    <div>
    <label htmlFor="functionInput" className="sr-only">Funcion</label>
  
  <div className="relative">
  <select
    id="functionInput"
      className="select select-bordered  w-full"
      placeholder="Funcion"
      autoComplete="off"
      {...register("role")}
      onChange={(event) => {
          if(event.target.value == "OFFICER"){
                setIsOfficer(true)
          }
          if(event.target.value == "DISPATCHER")
          setIsOfficer(false)
      }}
     > 
        <option value="DISPATCHER">Operador 911</option>
      <option value="OFFICER">Oficial</option>
    </select>
    </div>
    {errors.role ? <p className={errorStyles}>{errors.role?.message}</p> : null}
    </div>

    <div>
    <label htmlFor="cuipInput" className="sr-only">Cuip</label>
  
  <div className="relative">
  <input
    id="cuipInput"
      className={inputStyles}
      placeholder="Cuip"
      autoComplete="off"
      {...register("cuip")}
     //register goes here
    />
    </div>
    {errors.cuip ? <p className={errorStyles}>{errors.cuip?.message}</p> : null}
    </div>

    {/* check if fucntion is seelected as oficial show group is dispatcher does not show it */}
    {isOfficer &&<div>
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
    </div> }
    

    <input type='submit' className='btn float-right' value="crear agente"></input>
    {isError ? <p className={`${errorStyles} pt-4`}>{`${(error as ErrorsI).response.data.message}`}</p> : null}
    </form>
    </div>
  </div>
</div>
</>}
</>
  )
}
