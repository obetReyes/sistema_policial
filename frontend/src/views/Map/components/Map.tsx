import React, { useRef , useLayoutEffect, useState, useEffect} from 'react'
import { useContext } from 'react'
import { PlacesContext, MapContext } from '../../../contexts'
import { LngLat, LngLatLike, Map, Marker, Popup } from 'mapbox-gl'



interface MarkerI{
  latlng: number[]; color: string; html: string;
}

interface PropsI{
  markers:MarkerI[]
}
export const MapView = ({markers}:PropsI) => {
 
  const styles = {
   satellite:`mapbox://styles/mapbox/satellite-streets-v12?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`,
    street:`mapbox://styles/mapbox/dark-v11?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`,
  }


    const {isloading, userLocation,  setStartDirection, startDirection, endDirection, setEndDirection} = useContext(PlacesContext)
    const {setMap, map, getRouteBetweenPoints, setMarkers, routeMarkerEnd, routeMarkerStart,distance} = useContext(MapContext)
    const mapDiv = useRef<HTMLDivElement>(null)
    const [currentStyle, setCurrentStyle] = useState<string>(styles.street)
    const [IsDistance, setIsDistance]  = useState<boolean>(false)
    
    const handleStyle  =  () => {
      if(currentStyle == styles.street){
        return setCurrentStyle(styles.satellite)
      }else{
        
        return setCurrentStyle(styles.street)
      }
      
    }
  
  

   
    
  
  useLayoutEffect(() => {
        if(!isloading){
            const map = new Map({
                container: mapDiv.current!, // container ID
                style:currentStyle, // style URL
                center:  userLocation, // starting position [lng, lat]
                zoom: 13, // starting zoom
            });
            setMarkers(markers, map)
          setMap(map)
          setIsDistance(false)
        }
    }, [isloading, currentStyle, markers])


    if(map &&  startDirection == undefined && endDirection == undefined )
      map.once("dblclick", (e) => {
        setStartDirection([e.lngLat.lng, e.lngLat.lat]);
      
        routeMarkerStart.setLngLat(e.lngLat).addTo(map)
      })


    if(map && startDirection !== undefined &&  endDirection == undefined){
      map.once("dblclick", (e) => {
        setEndDirection([e.lngLat.lng, e.lngLat.lat]);
 
        routeMarkerEnd.setLngLat(e.lngLat).addTo(map)
        setIsDistance(true)
      
      })
   
    }
  


    

  
    useEffect(() => {
  
      if (map && startDirection !==  undefined &&  endDirection !== undefined) {
        getRouteBetweenPoints(startDirection, endDirection)

 
      }
      
    
   
    }, [map, startDirection, endDirection]);

 
 
    return (
      <>
       <div className='w-full h-screen' ref={mapDiv}></div>
      {IsDistance ? 
    <div className='fixed z-50 top-2 left-4 p-4 bg-gray-800 text-white'>
        <p>estas ubicado a {distance.kms} de tu destino</p>
        <p>el tiempo estimado de llegada son {distance.minutes} minutos en auto</p>
    </div>
    
    : null  
    }
      {currentStyle == styles.satellite  ?  <button className='fixed top-2 rounded-lg p-1 bg-gray-800 text-white right-4' onClick={handleStyle}>vista de calles</button> : <button className='fixed top-2 rounded-lg p-1 bg-gray-800 text-white right-4' onClick={handleStyle}>vision satelital</button>}
      </>
  )
}
