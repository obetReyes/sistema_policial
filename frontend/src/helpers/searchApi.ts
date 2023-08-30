
import { useContext } from "react"
import axios from "axios"


export const searchApi = axios.create({
    baseURL:"https://api.mapbox.com/geocoding/v5/mapbox.places",
    params:{
        limit:5,
        laguage:"es",
        access_token:import.meta.env.VITE_MAPBOX_TOKEN
    }
})