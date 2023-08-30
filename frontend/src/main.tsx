import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

if(!navigator.geolocation){
  alert("no se ha podido geolocalizar el dispositivo por favor contacta a tus superiores");
  throw new Error("no se ha podido geolocalizar el dispositivo por favor contacta a tus superiores");
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
