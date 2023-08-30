import { useContext, useState } from 'react'
import { MapContext, PlacesContext } from '../../../contexts'


export const BtnDirections = () => {


  const { setStartDirection, setEndDirection,  } = useContext(PlacesContext)

const { map,setDistance} = useContext(MapContext)

    const handleStates = () => {
   
      setStartDirection(undefined)
      setEndDirection(undefined)
      if(map ){
       const isLayer = map.getLayer('routeString')
        if(isLayer){
          map.removeLayer('RouteString')
          map.removeSource('RouteString')
          setDistance({
            kms:undefined,
            minutes:undefined
        })
        }
      
      }
      
   
    }
    return (
    <button onClick={handleStates} className="btn font-medium text-yellow-400  underline" >calcular distancias</button>
  )
}