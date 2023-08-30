import { z } from "zod";
const usernameContraint = z.string().min(6,{message: "el nombre de no puede tener menos de 6 caracteres"}).max(60, {message:"el nombre de usuario no puede exceder los 60 caracteres"});


const passwordContraint = z.string().min(8,{message: "la contrasena debe incluir al menos 8 caracteres"}).max(100,{message:"la contrasena no debe  exceder los 100 caracteres"}).trim();

const roleContraint =  z.string().min(7, {message:"el rol no puede tener menos de 7 caracteres"}).max(10, {message:"el rol no puede tener mas de 10 caracteres"}).regex(/^(\d|\w)+$/,{message:"el rol no puede contener espacios o caracteres especiales"});

const cuipContraint = z.string().min(25, {message:"el cuip debe contener 25 carateres"}).max(25,{message:"el cuip debe contener 25 caracteres"}).trim();

const groupContraint = z.string().min(6,{message: "el nombre de grupo de no puede tener menos de 6 caracteres"}).max(60, {message:"el nombre de usuario no puede exceder los 60 caracteres"}).trim().optional();

export const userValidator = z.object({
    body:z.object({
        username:usernameContraint,
        password:passwordContraint,
        cuip:cuipContraint,
        role:roleContraint,
        group:groupContraint
    }).strict("los unicos campos disponibles son: username, email, password, role,  cuip y group")
});

export const userParamsValidator = z.object({
    params:z.object({
        username:usernameContraint
    }).strict("el unico parametro disponible es: el nombre de usuario")
});

export const userUpdateValidator = z.object({
    body:z.object({
        username:z.string().min(6,{message: "el nombre de no puede tener menos de 6 caracteres"}).max(60, {message:"el nombre de usuario no puede exceder los 60 caracteres"}),
        role:z.string().min(7,{message: "el rol no puede tener menos de 7  caracteres"}).max(10, {message:"el rol no puede tener mas de 10 caracteres"}),
        password: z.string().min(8,{message: "la contrasena debe incluir al menos 8 caracteres"}).max(100,{message:"la contrasena no debe  exceder los 100 caracteres"}).trim().optional(),
        group:z.string().min(6,{message: "el nombre de grupo de no puede tener menos de 6 caracteres"}).max(60, {message:"el nombre de usuario no puede exceder los 60 caracteres"}).optional()
    })
});
export const useQueryValidator = z.object({
    query:z.object({ agents:z.string().min(6,{message: "la busqueda de los agentes no puede tener menos de 6 caracteres"}).max(60, {message:"la busqueda de los agentes no puede exceder los 60 caracteres"}),
    limit:z.coerce.number().min(1,{message:"el numero no puede ser negativo"}).nonnegative({message:"el numero no puede ser negativo"}).max(100, {message:"el limite de datos requerido excede el limite de peticios de datos, se pueden obtener un maximo de 100 datos por llamada"}).optional().transform(String),
    starting_after:z.coerce.number().nonnegative({message:"no existen datos con un id negativo"}).optional()
        })
});