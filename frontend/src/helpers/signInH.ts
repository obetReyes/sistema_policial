import * as yup from "yup";


export interface SignInI{
    username:string
    password:string
}
export interface SignInResI{
    message:{
        token:string
        role: string
    }
}
export interface DecodedI{
    info:{
        username:string
        role:string
    }
    exp:number
    iat:number
}


export const signInSchema = yup.object({
    username:yup.string().trim().min(6, "el nombre de usuario no puede ser tan corto").max(30, "el nombre de usuario no puede tener mas de 30 caracteres").required("necesitas ingresar un nombre de usuario"),
    password:yup.string().trim("tu contrasena no puede contener espacios").min(6,"la contrasena no puede ser tan corta").max(60, "la contrasena no puede ser tan larga").required("la contrasena es requerida"),
}).required("el formulario no puede estar vacio");
