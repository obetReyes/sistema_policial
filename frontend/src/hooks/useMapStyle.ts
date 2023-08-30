import { useState, useContext } from "react"
import { MapContext} from "../contexts"

const styles = {
    satellite:"mapbox://styles/mapbox/satellite-streets-v12",
    street:"mapbox://styles/mapbox/streets-v12",
}

export const useMapStyle = () => {

    const {map, isMapReady} =  useContext(MapContext)
    const [currentStyle, setCurrentStyle] = useState<string>(styles.street)

    const handleStyle  =  () => {
        if(currentStyle == styles.street){
       
        
      
          return setCurrentStyle(styles.satellite)
        
        }else{
     
          return setCurrentStyle(styles.street)
        }
        
      }
      return {
        styles,
        currentStyle,
        handleStyle
      }
}