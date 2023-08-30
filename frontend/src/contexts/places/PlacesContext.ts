import { createContext } from "react"

export interface PLACES_CONTEXT_PROPS{
    isloading:boolean
    userLocation?:[number,number]
   
    startDirection?:[number, number] | undefined
    setStartDirection:(startDirection?:[number, number]) => void
    endDirection?:[number, number] | undefined
    setEndDirection:(startDirection?:[number, number]) => void
}
export const PlacesContext  = createContext<PLACES_CONTEXT_PROPS>({} as PLACES_CONTEXT_PROPS);