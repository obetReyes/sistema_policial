import * as yup from "yup";

export interface CreateSummaryI{
    callTime:string,
    incident:string,
    requestor:string,
    notes:string,
    location:string,
    phone:string,
}
export interface SummaryI{
    id:number,
    createdAt:string,
    updateAt:string
    callTime:string,
    incident:string,
    requestor:string,
    notes:string,
    location:string,
    phone:string,
    userName:string
}
export interface SummaryResI{
    message:SummaryI
}
export interface SummariesResI{
    message:SummaryI[]
    limit:number,
    records:number,
    starting_after:number
}

export const createSummarySchema = yup.object({
    callTime:yup.string().min(7, "la descripcion del timepo de la llamada no puede tener menos de 7 caracteres").max(120, "la descripcion del tiempo de la llamada no puede exceder los 120 caracteres"),
    incident:yup.string().min(20, "la descripcion del incidente no puede ser menos de 20 caracteres").max(400, "la descripcion del incidente no puede exceder los 400 caracteres"),
    requestor:yup.string().min(7, "el nombre de la persona o las personas que llamaron no puede ser menor a 7 caracteres").max(100, "el nombre de las personas o personas que llamaron no pueden exceder lso 100 caracteres"),
    notes:yup.string().min(20, "las notas de la llamada no pueden ser menores a 20 caracteres").max(400,"las notas de la llamada no pueden exceder los 400 caracteres"),
    location:yup.string().min(10, "la ubicacion del incidente no puede ser menor a 10 caracteres").max(250,"la ubicacion de la incidente no puede ser mayor a 250 caracteres"),
    phone:yup.string().min(10,"el numero de telefono no puede ser inferior a 10 numeros").max(20,"el numero de telefono no puede ser mayor a 20 numeros").matches(new RegExp("^[0-9]+$"),"el numero no puede incluir letras o caracteres especiales")
})