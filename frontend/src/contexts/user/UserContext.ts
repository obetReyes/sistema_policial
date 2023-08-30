import { createContext } from "react"

export interface USER_CONTEXT_PROPS{
    user:boolean
    role:string
    token:string
    isUserFristTime:boolean
    setUser:(user:boolean) => void
    setRole:(role:string) => void
    setToken:(token:string) => void
    setIsUserFristTime:(condition:boolean) => void
}

export const UserContext = createContext<USER_CONTEXT_PROPS>
({}  as USER_CONTEXT_PROPS)