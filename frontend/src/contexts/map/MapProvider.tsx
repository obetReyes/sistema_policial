import { useContext, useEffect, useReducer, useState } from "react"
import { AnySourceData, LngLat, LngLatBounds, LngLatLike, Map, Marker, Popup } from "mapbox-gl"
import { MapContext } from "./MapContext"
import { MapReducer } from "./MapReducer"

import { DirectionsResponse, directionsApi } from "../../helpers"
import mapboxgl from "mapbox-gl"

interface MarkerI{
    latlng: number[]; color: string; html: string;
}

interface DistanceI{
    kms:number | undefined,
    minutes:number | undefined
}

interface PROPS{
    children: JSX.Element | JSX.Element[]
}

export interface MAP_STATE{
    isMapReady:boolean,
    map?:Map
    markers:MarkerI[]
    routeMarkerStart: Marker
    routeMarkerEnd: Marker
    distance:DistanceI
}

const INITIAL_STATE:MAP_STATE = {
    isMapReady:false,
    map:undefined,
    markers:[],
    routeMarkerStart: new mapboxgl.Marker(),
    routeMarkerEnd: new mapboxgl.Marker(),
    distance:{
        kms:undefined,
        minutes:undefined
    }
}
export const MapProvider = ({children}:PROPS) => {
    const [distance, setDistance] = useState<DistanceI>({
        kms:undefined,
        minutes:undefined
    })
    const [state, dispatch] = useReducer(MapReducer, INITIAL_STATE)




    const setMap = (map:Map) => {
     
    
        dispatch({type:"setMap", payload:map})
    }

    const getRouteBetweenPoints = async(start:[number, number], end:[number, number]) => {
       
        const resp = await directionsApi.get<DirectionsResponse>(`/${ start.join(',') };${ end.join(',') }`)
        const {distance, duration, geometry} = resp.data.routes[0];
        const {coordinates:coords} =geometry;
        let kms = distance/ 1000;
        kms = Math.round(kms * 100);
        kms /= 100;

        const minutes = Math.floor( duration / 60);
        setDistance({
            kms:kms,
            minutes:minutes
        })
    
        
        const bounds = new LngLatBounds(
            start,
            start
        );

        for(const coord of coords){
            const newCoord: [number, number] = [coord[0], coord[1]]
            bounds.extend(newCoord);
        }

        state.map?.fitBounds(bounds,{
            padding:200
        });

        //polyline
        const sourceData:AnySourceData ={
            type:"geojson",
            data:{
                type:"FeatureCollection",
                features:[
                    {
                        type:"Feature",
                        properties:{},
                        geometry:{
                            type:"LineString",
                            coordinates:coords
                        }
                    }
                ]
            }
        }
        

        if(state.map?.getLayer('RouteString')){
            state.map.removeLayer('RouteString');
            state.map.removeSource('RouteString');
            setDistance({
                kms:undefined,
                minutes:undefined,
            })
        }

        state.map?.addSource('RouteString', sourceData);
        
        state.map?.addLayer({
            id:'RouteString',
            type:"line",
            source:"RouteString",
            layout:{
                'line-cap':"round",
                'line-join':"round"
            },
            paint:{
                'line-color':"yellow",
                "line-width":3
            }

        })
        
    }

    const setMarkers = (markers:MarkerI[], map:Map) => {
        markers.forEach((agent) => {
            const popUp = new Popup()
            popUp.setHTML(agent.html)
             new Marker({
                color:agent.color
            })
            .setLngLat(agent.latlng as LngLatLike)
            .setPopup(popUp)
            .addTo(map);
            
        })
        
    }
    return(
        <MapContext.Provider value={{...state,distance, setDistance, setMap, getRouteBetweenPoints, setMarkers}}>
            {children}
        </MapContext.Provider>
    )
}