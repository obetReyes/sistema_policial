import { useRecordMutation } from "../../../hooks";
import { CreateReportI, ReportResI, createReportSchema, ErrorsI } from "../../../helpers";
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from "react";
import {useQueryClient} from "@tanstack/react-query"

interface Props{
  param?:{}
}
export const ReportModal = ({param}:Props) => {

  const {mutate, error, isError, isLoading} = useRecordMutation<ReportResI, CreateReportI>("reports", "FoundReports");
  
  const [isModal, setIsModal] = useState<boolean>(false);
  const client = useQueryClient()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateReportI>({
    mode: "onSubmit",
    resolver: yupResolver(createReportSchema),
  });

 
  const onSubmit = handleSubmit(async(data,e) => {
    mutate(data,{
      onSettled:() => {
        data.event = ""
        data.actions = ""
        data.summary = ""
        e?.target.reset()
        reset()
      },
      onSuccess:() => {
        client.refetchQueries(["searchRecords", "FoundReports", "reports"])
        setIsModal(false)
      }
    })
   
  })
  
   // common styles 
 const inputStyles = "w-full rounded-lg rounded-sm border-gray-300 p-4 pr-12 text-sm text-warning shadow-sm focus:border-zinc-800 focus:ring-transparent"
 const errorStyles = "text-center 	 text-sm  !mt-0 !mb-0 text-error font-semibold underline"
  return (
    <>
<label htmlFor="myModalReport" className="btn" onClick={() => setIsModal(true)}>crear reporte</label>
{isModal &&
<>

<input type="checkbox" id="myModalReport" className="modal-toggle" />
<div className="modal modal-bottom sm:modal-middle">
  <div className="modal-box relative">
  <label htmlFor="myModalReport" className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => {
    setIsModal(false)
    reset()
    }}>✕</label>
    <h3 className="font-bold text-lg">Nuevo Reporte</h3>
    <div className="modal-action p-4">
    <form className="flex flex-col w-full gap-10" onSubmit={onSubmit}>
  <label htmlFor="eventInput" className="sr-only">Suceso</label>
  
  <div>
  <div className="relative">
    <input
    id="eventInput"
      type="text"
      className={inputStyles}
      placeholder="Suceso"
      autoComplete="off"
      {...register("event")}
    />
  </div>
  {errors.event ? <p className={errorStyles}>{errors.event?.message}</p> : null}
  </div>

  <div>
  <label htmlFor="actionsInput" className="sr-only">Acciones Tomadas</label>
  
  <div className="relative">
    <textarea
    id="actionsInput"
    rows={4} 
    cols={50}
      className={inputStyles}
      placeholder="Acciones Tomadas"
      autoComplete="off"
      {...register("actions")}
    />
    </div>
    {errors.actions ? <p className={errorStyles}>{errors.actions?.message}</p> : null}
    </div>
    
    <div>
    <label htmlFor="sucessSumaryInput" className="sr-only">Resumen Del Suceso</label>
  
  <div className="relative">
  <textarea
    id="sucessSumaryInput"
    rows={4} 
    cols={50}
      className={inputStyles}
      placeholder="Resumen Del Suceso"
      autoComplete="off"
     {...register("summary")}
    />
    </div>
    {errors.summary ? <p className={errorStyles}>{errors.summary?.message}</p> : null}
    </div>
    {isLoading ? <span className="loader"></span> :
  
      <input  className=" btn float-right" type='submit'value="crear reporte"/>
    }
 
    </form>

    </div>
    {isError ? <p className={errorStyles}>{`${(error as ErrorsI).response.data.message}`}</p> : null}
  </div>
</div>
</>
}
</>
  )
}
