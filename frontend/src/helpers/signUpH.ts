import * as yup from "yup";


export interface SignUpI{
    username:string
    password:string
    password2?:string
    cuip:string
}


export const signUpSchema = yup.object({
    username:yup.string().min(6, "el nombre de usuario no puede ser tan corto").max(30, "el nombre de usuario no puede tener mas de 30 caracteres").required("necesitas ingresar un nombre de usuario"),
    password:yup.string().trim("tu contrasena no puede contener espacios").min(6,"la contrasena no puede ser tan corta").max(60, "la contrasena no puede ser tan larga").required("la contrasena es requerida"),
    password2: yup.string()
     .oneOf([yup.ref('password')], 'las contrasenas no coinciden'),
    cuip:yup.string().trim().min(25,"el cuip debe contener 25 caracteres").max(25, "el cuip debe contener 25 caracteres").required("necesitas introducir tu cuip").matches(/^(\d|\w)+$/,"el cuip no es valido")
}).required("el formulario no puede estar vacio")


