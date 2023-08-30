import { useRecordMutation } from "../../../hooks";
import { CreateGroupI, GroupResI, createGroupSchema, ErrorsI } from "../../../helpers";
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from "react";
import {useQueryClient} from "@tanstack/react-query"

interface Props{
  param:{}
}
export const GroupsModal = ({param}:Props) => {
  const {mutate, error, isError, isLoading} = useRecordMutation<GroupResI, CreateGroupI>("groups", "FoundGroups");
  const [isModal, setIsModal] = useState<boolean>(false);
  const client = useQueryClient()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateGroupI>({
    mode: "onSubmit",
    resolver: yupResolver(createGroupSchema),
  });

  const onSubmit = handleSubmit(async(data,e) => {
    
    mutate(data,{
      onSettled:() => {
        data.name = ""
        data.area = ""
        e?.target.reset()
        reset()
      },
      onSuccess:() => {
      if(Object.keys(param).length >=1)
        client.refetchQueries(["searchRecords", "FoundGroups", "groups"])
      else{
        client.refetchQueries(["records", "groups"])
      }
      setIsModal(false)
      }
    
    })
  })
  
  // common styles
  const inputStyles =
    "w-full rounded-lg rounded-sm border-gray-300 p-4 pr-12 text-sm text-warning shadow-sm focus:border-zinc-800 focus:ring-transparent";
  const errorStyles = "absolute  text-sm !mt-0 !mb-0  text-error font-semibold underline";

  return (
    <>
      <label htmlFor="myModalGroups" className="btn" onClick={() => setIsModal(true)}>
        crear grupo
      </label>
      {isModal &&
<>
      <input type="checkbox" id="myModalGroups" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <label
            htmlFor="myModalGroups"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => {
              setIsModal(false)
              reset()
              }} >
            ✕
          </label>
          <h3 className="font-bold text-lg">Nuevo Grupo</h3>
          <form className="flex flex-col gap-10" onSubmit={onSubmit}>

            <div>
              <label htmlFor="groupNameInput" className="sr-only">
                Nombre Del Grupo
              </label>
  

              <div className="relative">
                <input
                  type="text"
                  id="groupNameInput"
                  className={inputStyles}
                  placeholder="Nombre Del Grupo"
                  autoComplete="off"
                  {...register("name")}
                />
              </div>
              {errors.name ? <p className={errorStyles}>{errors.name?.message}</p> : null}
            </div>

            <div>
              <label htmlFor="operationsAreaInput" className="sr-only">
                Area de Operaciones
              </label>

              <div className="relative">
                <input
                type="text"
                  id="operationsAreaInput"
                  className={inputStyles}
                  placeholder="Area de Operaciones"
                  autoComplete="off"
                  {...register("area")}
                />
              </div>
              {errors.area ? <p className={errorStyles}>{errors.area?.message}</p> : null}
            </div>
            {isLoading ? <span className="loader"></span> :
  
      <input  className=" btn float-right" type='submit'value="crear grupo"></input>
    }
     {isError ? <p className="   text-sm  !mt-0 !mb-0    text-error font-semibold underline">{`${(error as ErrorsI).response.data.message}`}</p> : null}
          </form>
        </div>
      </div>
      </>
    }
    </>
    
  );
};
