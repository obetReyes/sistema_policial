import { LngLat, Map, Marker } from "mapbox-gl";
import { createContext } from "react";

interface MarkerI{
    latlng: number[]; color: string; html: string;
}
interface DistanceI{
    kms:number | undefined,
    minutes:number | undefined
}
export interface MAP_CONTEXT_PROPS{
    isMapReady:boolean
    map?:Map
    //methods
    setMarkers: (markers: MarkerI[], map: Map) => void
    setMap:(map:Map) => void,

   routeMarkerStart:Marker
   routeMarkerEnd:Marker,
    distance : DistanceI
    setDistance:React.Dispatch<React.SetStateAction<DistanceI>>
    getRouteBetweenPoints: (start: [number, number], end: [number, number]) => Promise<void>
}
export const MapContext = createContext<MAP_CONTEXT_PROPS>({} as MAP_CONTEXT_PROPS)