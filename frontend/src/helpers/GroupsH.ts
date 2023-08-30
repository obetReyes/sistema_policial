import * as yup from "yup";

export interface UserInfoGroupI{
    name: string,
    location: null | string,
    reports: number
}
export interface CreateGroupI{
    name:string
    area:string
}
export interface UpdateGroupI{
    newName:string,
    name:string,
    area:string
}
export interface GroupsI{
    id: number,
    area: string,
    name:string,
    createdAt: string,
    users: number
}
export interface GroupI{
    length: number;
    id:        number;
    name:      string;
    area:      string;
    createdAt: string;
    updatedAt: string;
    users:     UserInfoGroupI[];
}
export interface  GroupActionResI{
    id: number,
    name: string,
    area: string,
    createdAt: string,
    updatedAt: string
}

export interface GroupsResI{
    message:GroupsI[]
     limit: number,
    records: number,
    starting_after: number
}
export interface GroupResI{
    message:GroupI
 }

export const createGroupSchema = yup.object({
    name:yup.string().min(6, "el nombre de grupo de no puede tener menos de 6 caracteres").max(60, "el nombre de usuario no puede exceder los 60 caracteres").required("el nombre del grupo es requerido"),
    area:yup.string().min(8,"el area asignada no puede ser menor a 8 caracteres").max(120,"el area asignada no puede ser menor a 120 caracteres")
})
export const updateGroupSchema = yup.object({
    newName:yup.string().min(6, "el nombre de grupo de no puede tener menos de 6 caracteres").max(60, "el nombre de usuario no puede exceder los 60 caracteres").required("el nombre del grupo es requerido"),
    name:yup.string().min(6, "el nombre de grupo de no puede tener menos de 6 caracteres").max(60, "el nombre de usuario no puede exceder los 60 caracteres").required("el nombre del grupo es requerido"),
    area:yup.string().min(8,"el area asignada no puede ser menor a 8 caracteres").max(120,"el area asignada no puede ser menor a 120 caracteres")
})