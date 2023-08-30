import * as yup from "yup";


export interface CreateReportI {
  event: string;
  actions: string;
  summary: string;
}

export interface ReportI {
  id: number;
  createdAt: string;
  updateAt: string;
  event: string;
  actions: string;
  summary: string;
  userName: string;
}

export interface ReportResI {
  message: ReportI
}
export interface ReportsResI{
    message: ReportI[]
    limit: number,
    records: number,
    starting_after: number
}

export const createReportSchema = yup.object({
  event:yup.string().trim().min(10, "el evento no puede tener menos de 10 caracteres").max(300, "el evento no puede ser descrito con mas de 300 caracteres"),
  actions:yup.string().trim().min(8,"las acciones tomadas no pueden tener menos de 8 caracteres").max(300, "las acciones tomadas no pueden exceder los 300 caracteres"),
  summary:yup.string().trim().min(20,"la recopilacion del evento no puede ser menor a  25 caracteres").max(400, "la recopilacion no puede exceder los 400 caracteres")
}).required("los campos son requeridos")


