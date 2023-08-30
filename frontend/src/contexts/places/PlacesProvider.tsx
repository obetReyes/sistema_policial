import React, {useReducer, useEffect} from 'react'
import { getUserLocation } from '../../helpers/getUserLocation'

import { PlacesContext } from './PlacesContext'
import { PlacesReducer } from './PlacesReducer'

interface PROPS{
    children: JSX.Element | JSX.Element[]
}
export interface PLACES_STATE{
    isloading:boolean
    userLocation?: [number, number]
   
    startDirection?:[number, number]
    endDirection?:[number, number]
   
}

const INITIAL_STATE:PLACES_STATE ={
    isloading:true,
    userLocation:undefined,
    }
export const PlacesProvider = ({children}:PROPS) => {
    const [state, dispatch] = useReducer(PlacesReducer, INITIAL_STATE)

    useEffect(() => {
        getUserLocation().then(lngLat => dispatch({type:"setUserLocation", payload: lngLat}))
    }, [])

  

    const setStartDirection = (startDirection?:[number, number]) => {
        dispatch({type:"setStartDirection", payload:startDirection})
    }
   
    const setEndDirection = (endDirection?:[number, number] | undefined) => {
        dispatch({type:"setEndDirection", payload:endDirection})
    }
  return (
    <PlacesContext.Provider value={{...state,  setStartDirection, setEndDirection}}>{children}</PlacesContext.Provider>
  )
}