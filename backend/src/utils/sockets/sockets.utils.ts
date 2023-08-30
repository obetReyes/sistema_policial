import { JwtPayload } from "jsonwebtoken";
import { Socket } from "socket.io"

export interface ISocket extends Socket {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    decodedToken?: JwtPayload;
  
    // other additional attributes here, example:
    // surname?: string;
  }

  
export const rolesColors = (socket:ISocket) => {
    if(socket.decodedToken?.info.role == "OPERATOR"){
      return "#FFEF09"
  
  }
  if(socket.decodedToken?.info.role == "DISPATCHER"){
    return "#056FD0"
}
if(socket.decodedToken?.info.role == "AGENT"){
  return "#E00201"
}
}



export const EVENTS = {
    connection: "connection",
    disconnect:"disconnect",
    connect_error:"connect_error",
    CLIENT: { // on listen from client 
      SEND_LOCATION: "SEND_LOCATION",
      GET_LOCATIONS: "GET_LOCATIONS",
    },
    SERVER: {  // emit from server
      SEND_LOCATIONS: "SEND_LOCATIONS",
    },
  };
  