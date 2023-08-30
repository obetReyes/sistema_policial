import {z} from "zod";

export const reportValidator = z.object({
    body:z.object({
        event:z.string().min(10,{message: "la descripcion del evento de no puede tener menos de 10 caracteres"}).max(300, {message:"la descripcion del evento no puede exceder los 60 caracteres"}).trim(),
        actions:z.string().min(8, {message:"las acciones tomadas no pueden tener menos de 8 caracteres"}).max(300, {message:"las acciones tomadas no puedes exceder los 300 caracteres"}).trim(),
        summary:z.string().min(20, {
            message:"la recopilacion no puede tener menos de 20 caracteres"
        }).max(400, {message:"la recopiliacion no puede exceder los 400 caracteres"}) .trim()
    }).strict("los unicos campos disponibles son: event, actions y summary")
});


export const reportParamsValidator = z.object({
   params:z.object({
        // eslint-disable-next-line no-useless-escape
        reportId:z.string().min(1,{message:"el numero no puede ser negativo"}).regex(/^(0|[1-9]\d*)$/,{message:"el numero no puede incluir letras,caracteres especiales ni tampoco puede incluir numeros negativos"})
   }).strict("el unico parametro disponible es: el id del reporte") 
});


export const reportQueryValidator = z.object({
    query:z.object({
        officer:z.string().min(6,{message: "el nombre del oficial no puede tener menos de 6 caracteres"}).max(60, {message:"el nombre del oficial no puede exceder los 60 caracteres"}).optional(),
        event:z.string().min(5,{message: "la descripcion del  evento no puede tener menos de 5 caracteres"}).max(300, {message:"la descripcion del evento no puede exceder los 300 caracteres"}).optional(),
        limit:z.coerce.number().min(1,{message:"el numero no puede ser negativo"}).nonnegative({message:"el numero no puede ser negativo"}).max(100, {message:"el limite de datos requerido excede el limite de peticios de datos, se pueden obtener un maximo de 100 datos por llamada"}).optional().transform(String),
        starting_after:z.coerce.number().nonnegative({message:"no existen datos con un id negativo"}).optional()
   }).strict("los unicos parametros query: disponibles son: officer, limit y starting_after") 
});
