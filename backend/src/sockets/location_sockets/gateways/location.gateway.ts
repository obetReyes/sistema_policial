import { Socket, Server } from "socket.io";
import { ISocket, rolesColors, redis, EVENTS } from "../../../utils";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { createLocationService, readAllLocationsService, readLocationService, removeLocationService, updateLocationService } from "../services/location.services";


dotenv.config();


interface UserLocationI{
  latlng: [number, number],
        color: string
        html: string
}
interface JwtPayload {
  info: {
    username: string;
    role: string;
  }
  iat: number;
  exp: number;
  // Add any other properties you want to include in the JWT payload
}




export const locationGateway = ({ io }: { io: Server }) => {
 

  
  
  io.use((socket: ISocket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Authentication error: missing token"));
    }
    
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
      socket.decodedToken = decoded as JwtPayload
      next();
    } catch (error) {
      return next(new Error("Authentication error: invalid token"));
    }
  });




  io.on(EVENTS.connection, async(socket:ISocket) => {
    const data = await readAllLocationsService();
    const locations:UserLocationI[] = []
    data.forEach((userLocation) => {
      locations.push({
        color:rolesColors(socket)!,
        html:userLocation.userName,
        latlng:[userLocation.latitude!, userLocation.longitude!]
      })
    })
    console.log("locations", locations)

    socket.emit(EVENTS.SERVER.SEND_LOCATIONS, locations)



    // bad code need to refactor it 
  socket.on(EVENTS.CLIENT.SEND_LOCATION, async(latitude:number, longitude:number) => {
    const isLocation = await readLocationService({
      userName:socket.decodedToken?.info.username
    })

    if (isLocation !== null){
      const updateLOcation = await updateLocationService({
        where:{
          userName:socket.decodedToken?.info.username
        },
        data:{
          user:{
            connect:{
              name:socket.decodedToken?.info.username
            }
          },
          latitude: latitude,
       longitude: longitude
        }
      })
    }else{


    try {
      const data = await createLocationService({
       user: {
         connect: {
           name: socket.decodedToken?.info.username
         }
       },
       latitude: latitude,
       longitude: longitude
     }) 
     
     console.log(data)
     } catch (error) {
       console.log("error",error)
     }
    }    
  });

  // disconnect and connectError
  socket.on(EVENTS.disconnect, () => {
    console.log("disconnect")
  })
  socket.on(EVENTS.connect_error, () => {
    console.log("connectError")
  })
})

  
  
};