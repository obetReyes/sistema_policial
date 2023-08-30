import * as yup from "yup";
export interface UserI {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  group: string;
  role: string;
  location: string | null;
  reports?: number;
  summaries?: number;
}
export interface UsersI {
  id: number;
  name:string;
  createdAt: string;
  updatedAt: string;
  role: string;
  reports?: number;
  summaries?: number;
  group?:string | null
}
export interface UpdateUserI {
        group?:string,
        username:string,
        role:string
        password?:string

}

export interface createUserI{
        username:string
        password:string
        password2?:string
        cuip:string
        group?:string
        role:string
}



export interface CreateUserResI{
        message:{
                id:number,
                name:string,
                role:string,
                cuip:string,
                createdAt:string,
                group:string
        }
}
export interface UserResI {
        message:UserI
}
export interface UsersResI {
        message:UsersI[]
}
export interface UpdateUsersI{
        message:UsersI
}

export const createUserSchema = yup.object({
        group:yup.string().min(6, "el nombre de grupo de no puede tener menos de 6 caracteres").max(60, "el nombre de usuario no puede exceder los 60 caracteres").required("el nombre del grupo es requerido").optional(),
    username:yup.string().trim().min(6, "el nombre de usuario no puede ser tan corto").max(30, "el nombre de usuario no puede tener mas de 30 caracteres").required("necesitas ingresar un nombre de usuario"),
    password:yup.string().trim("tu contrasena no puede contener espacios").min(6,"la contrasena no puede ser tan corta").max(60, "la contrasena no puede ser tan larga").required("la contrasena es requerida"),
    password2: yup.string()
     .oneOf([yup.ref('password')], 'las contrasenas no coinciden'),
    cuip:yup.string().trim().min(25,"el cuip debe contener 25 caracteres").max(25, "el cuip debe contener 25 caracteres").required("necesitas introducir tu cuip").matches(/^(\d|\w)+$/,"el cuip no es valido"),
    role:yup.string().min(7, "el rol no puede tener menos de 7 caracteres").max(10,"el rol no puede tener mas de 10 caracteres").matches(/^(\d|\w)+$/,"el rol no puede contener espacios o caracteres especiales")
})
export const updateUserSchema = yup.object({
        role:yup.string().min(7, "el rol no puede tener menos de 7  caracteres").max(10, "el rol no puede tener mas de 10 caracteres"),
        password: yup.string().min(8, "la contrasena debe incluir al menos 8 caracteres").max(100,"la contrasena no debe  exceder los 100 caracteres").trim().optional(),
        group:yup.string().min(6, "el nombre de grupo de no puede tener menos de 6 caracteres").max(60, "el nombre de usuario no puede exceder los 60 caracteres").optional()
})
