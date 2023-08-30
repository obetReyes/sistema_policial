import { useContext} from 'react'
import { MapContext, PlacesContext } from '../contexts'


export const BtnMyLocation = () => {

   const {map, isMapReady} =  useContext(MapContext)
  const {userLocation} = useContext(PlacesContext)


   const getLocation = () => {
    if(!isMapReady || !userLocation){
            throw new Error("mapa no esta listo")
    }
    map?.flyTo({
        zoom:16,
        center:userLocation
    })
  }
    return (
    <button onClick={getLocation} className="btn  btn-outline font-medium text-yellow-400  underline ">ir a mi ubicacion</button>
  )
}