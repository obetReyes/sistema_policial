import { AppRouter } from "./components"
import {BrowserRouter} from "react-router-dom"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MapProvider, PlacesProvider, UserProvider } from "./contexts";

import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { CookiesProvider } from "react-cookie";


function App() {
  const client = new QueryClient();
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

if(!navigator.geolocation){
  alert("no se ha podido geolocalizar el dispositivo por favor contacta a tus superiores");
  throw new Error("no se ha podido geolocalizar el dispositivo por favor contacta a tus superiores");
}

  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools/>
    <BrowserRouter>
    <CookiesProvider>
    <UserProvider>
    <PlacesProvider>
      <MapProvider>
    <AppRouter/>
    </MapProvider>
    </PlacesProvider>
    </UserProvider>
    </CookiesProvider>
    </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
