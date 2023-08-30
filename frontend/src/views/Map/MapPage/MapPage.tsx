import { useContext, useEffect, useState } from "react";
import { MapView } from "../components/Map";
import { ProtectedLayout } from "../../../components/ProtectedLayout";
import {  PlacesContext, UserContext } from "../../../contexts";
import { io, Socket } from "socket.io-client";
import { FristTImeDirectionsGuide } from "../components/FristTImeDirectionsGuide";


interface MarkerI{
  latlng: number[]; color: string; html: string;
}


export const MapPage = () => {
  const { userLocation } = useContext(PlacesContext);
  const { token} = useContext(UserContext);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [markers, setMarkers] = useState<MarkerI[]>([])


  useEffect(() => {
    const newSocket = io("http://localhost:8000", {
      auth: {
        token: token,
      },
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [token]);

  // Emit user location when socket and userLocation are available
  useEffect(() => {
    if (socket && userLocation) {
      socket.emit("SEND_LOCATION", userLocation[0], userLocation[1]);
     
      const handleLocations = (data:any) => {
    
        setMarkers(data);
     
      }  
      socket.on("SEND_LOCATIONS", handleLocations)
    }
  }, [socket, userLocation]);

  // Set up event listeners when socket is available
 



  return (
    <ProtectedLayout roles={["OPERATOR", "OFFICER", "DISPATCHER"]}>
      <main className="overflow-hidden w-full h-screen">
        <MapView markers={markers} />
          <FristTImeDirectionsGuide/>
      </main>
    </ProtectedLayout>
  );
};
