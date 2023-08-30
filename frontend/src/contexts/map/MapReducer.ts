import { Map,  } from "mapbox-gl"
import { MAP_STATE } from "./MapProvider"

interface MarkerI{
    latlng: number[]; color: string; html: string;
}

interface DistanceI{
    kms:number | undefined,
    minutes:number | undefined
}

type MAP_ACTION = 
|{    type:"setMap",   payload:Map}
|{type:"setMarkers", payload:MarkerI[]}
| {type:"setDistance", payload:DistanceI}
export const MapReducer = (state:MAP_STATE, action:MAP_ACTION):MAP_STATE => {
    switch (action.type) {
        case "setMap":
            return {
                ...state,
                isMapReady:true,
                map:action.payload
            }
        case "setMarkers":
            return{
                ...state,
                markers:action.payload
            }
        default:
            return state;
    }
}