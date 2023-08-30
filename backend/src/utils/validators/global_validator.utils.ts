import {z} from "zod";
export const manyRecordsQueryValidator = z.object({
    query:z.object({
        entry:z.string().min(6,{message: "la busqueda no puede tener menos de 6 caracteres"}).max(60, {message:"la busqueda no puede ser mayor a 60 caracteres"}).optional(),
        limit:z.coerce.number().min(1,{message:"el numero no puede ser negativo"}).nonnegative({message:"el numero no puede ser negativo"}).max(100, {message:"el limite de datos requerido excede el limite de peticios de datos, se pueden obtener un maximo de 100 datos por llamada"}).optional().transform(String),
        skip:z.coerce.number().nonnegative({message:"no existen datos con un id negativo"}).optional()
   }).strict("los unicos parametros query: disponibles son: entry, limit y skip") 
});
