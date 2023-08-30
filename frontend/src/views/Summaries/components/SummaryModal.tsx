import { useRecordMutation } from "../../../hooks/"
import { CreateSummaryI, ErrorsI, SummaryResI, createSummarySchema } from "../../../helpers"
import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import {useQueryClient} from "@tanstack/react-query"

interface Props{
  param:{}
}
export const SummaryModal = ({param}:Props) => {
  const {mutate, error, isError, isLoading} = useRecordMutation<SummaryResI, CreateSummaryI>("summaries", "FoundSummaries");
  const [isModal, setIsModal] = useState<boolean>(false);
  const client = useQueryClient()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateSummaryI>({
    mode: "onSubmit",
    resolver: yupResolver(createSummarySchema),
  });

  const onSubmit = handleSubmit(async(data, e) => {
    mutate(data,{
      onSettled:() => {
        data.callTime = ""
        data.incident = ""
        data.location = ""
        data.notes = ""
        data.phone = ""
        data.requestor = ""
        e?.target.reset()
        reset()
      },
      onSuccess:() =>{
        if(Object.keys(param).length >=1)
        client.refetchQueries(["searchRecords", "FoundSummaries", "summaries"])
      else{
        client.refetchQueries(["records", "summaries"])
      }
      setIsModal(false)
      }
    })
   
  })

   // common styles 
 const inputStyles = "w-full rounded-lg rounded-sm border-gray-300 p-4 pr-12 text-sm text-warning shadow-sm focus:border-zinc-800 focus:ring-transparent"
 const errorStyles = "absolute  text-sm !mt-0 !mb-0 text-error font-semibold underline"
  return (
    <>
<label htmlFor="myModalSummary" className="btn" onClick={() => {
  setIsModal(true)
}}>crear sumario</label>
{isModal && <>
  <input type="checkbox" id="myModalSummary" className="modal-toggle" />
<div className="modal modal-bottom sm:modal-middle">
  <div className="modal-box relative">
  <label htmlFor="myModalSummary" className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => {
    setIsModal(false)
    reset()
    }}>✕</label>
    <h3 className="font-bold text-lg">Nuevo Sumario</h3>
    <form className="flex flex-col gap-10" onSubmit={onSubmit}>
  <label htmlFor="callTimeInput" className="sr-only">duracion de la llamada</label>
  <div className="my-4">
  <div className="relative">
    <input
    id="callTimeInput"
      type="text"
      className={inputStyles}
      placeholder="duracion de la llamada"
      autoComplete="off"
      {...register("callTime")}

    />
  </div>
  {errors.callTime ? <p className={errorStyles}>{errors.callTime?.message}</p> : null}
  </div>

  <div>
  <label htmlFor="requestorInput" className="sr-only">Solicitante</label>
  
  <div className="relative">
    <input
    type='text'
    id="requestorInput"
      className={inputStyles}
      placeholder="Solicitante"
      autoComplete="off"
      {...register("requestor")}
    />
    </div>
    {errors.requestor ? <p className={errorStyles}>{errors.requestor?.message}</p> : null}
    </div>
    


    <div>
    <label htmlFor="incidentInput" className="sr-only">incidente o suceso</label>
  
  <div className="relative">
  <textarea
    id="incidentInput"
    rows={4} 
    cols={50}
      className={inputStyles}
      placeholder="incidente o suceso"
      autoComplete="off"
      {...register("incident")}
     
    />
    </div>
    {errors.incident ? <p className={errorStyles}>{errors.incident?.message}</p> : null}
    </div>

    
    <div>
    <label htmlFor="locationInput" className="sr-only">ubicación</label>
  
  <div className="relative">
  <textarea
    id="locationInput"
    rows={4} 
    cols={50}
      className={inputStyles}
      placeholder="ubicación"
      autoComplete="off"
      {...register("location")}
    />
    </div>
    {errors.location ? <p className={errorStyles}>{errors.location?.message}</p> : null}
    </div>
    <div>
    <label htmlFor="notesInput" className="sr-only">notas</label>
  
  <div className="relative">
  <textarea
    id="notesInput"
    rows={4} 
    cols={50}
      className={inputStyles}
      placeholder="notas"
      autoComplete="off"
      {...register("notes")}
     //register goes here
    />
    </div>
    {errors.notes ? <p className={errorStyles}>{errors.notes?.message}</p> : null}
    </div>

    <div>
    <label htmlFor="phoneNumberInput" className="sr-only">numero de contacto</label>
  
  <div className="relative">
  <input
  type='text'
    id="phoneNumberInput"
      className={inputStyles}
      placeholder="numero de contacto"
      autoComplete="off"
      {...register("phone")}
     //register goes here
    />
    </div>
    {errors.phone ? <p className={errorStyles}>{errors.phone?.message}</p> : null}
    </div>
    {isLoading ? <span className="loader"></span> :
  
  <input  className=" btn float-right" type='submit'value="crear sumario de llamada"/>
}
{isError ? <p className="   text-sm  !mt-0 !mb-0    text-error font-semibold underline">{`${(error as ErrorsI).response.data.message}`}</p> : null}
    </form>
    </div>
   
</div>
</>}

</>
  )
}
