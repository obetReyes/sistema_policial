import { useContext, useEffect, useState } from 'react'
import { MapContext, PlacesContext } from '../../../contexts'


export const BtnDirections = () => {

  const {distance} =useContext(MapContext)
  const [isLoading, setIsLoading] = useState<boolean>(true); // initial loading 
  const { setStartDirection, setEndDirection,  endDirection,startDirection } = useContext(PlacesContext)
const [hasValidDirection,  setHasValidDirection] = useState<boolean>(false)
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
        }}
    }
  
    useEffect(() => {
      // Verifica si tienes una dirección o distancia válida y actualiza el estado.
      if (startDirection && endDirection  ) {
        setHasValidDirection(false);
      
      } 
      else {
        if(!isLoading)
        setHasValidDirection(true);
      }
      setIsLoading(false);
    }, [startDirection, endDirection, distance]);
  
   

    return (
    <button onClick={handleStates} className="btn font-medium text-yellow-400  underline"   disabled={hasValidDirection}>calcular distancias</button>
  )
}