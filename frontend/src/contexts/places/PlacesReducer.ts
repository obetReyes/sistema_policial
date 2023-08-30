import { PLACES_STATE } from "./PlacesProvider";
import { Feature } from "../../helpers"
type PLACES_ACTION =
  |{type:"setUserLocation",
  payload:[number,number]}
  | {
    type:"setStartDirection"
    payload:[number, number] | undefined
  }
  | {
    type:"setEndDirection"
    payload:[number, number] | undefined
  }
  | {
    type:"setDirectionsBtn"
    payload:boolean
  }


export const PlacesReducer = (state:PLACES_STATE, action:PLACES_ACTION):PLACES_STATE => {
  switch (action.type){
    case "setUserLocation":
    return {
      ...state,
      isloading:false,
      userLocation:action.payload
    }

    case "setStartDirection":
    return {
      ...state,
      isloading:false,
      startDirection:action.payload
    }
    case "setEndDirection":
    return {
      ...state,
      isloading:false,
      endDirection:action.payload
    }
  
    default:
      return state;
  }
}