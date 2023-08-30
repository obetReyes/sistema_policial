import { useContext } from "react";
import { MapContext, PlacesContext } from "../../contexts";
import { useSignOutMutation } from "../../hooks";
interface Props{
    children: JSX.Element | JSX.Element []
}
export const NavbarLayout = ({children}:Props) => {

  const {mutate} = useSignOutMutation()
  const { setStartDirection, setEndDirection} = useContext(PlacesContext)
  const { setDistance} = useContext(MapContext)
  
  return (
    <div className="w-full fixed bottom-4 z-50">
      <div className="navbar  bg-base-300 font-medium    w-12/12 lg:w-8/12 mx-auto  rounded-xl shadow-lg flex justify-between ">
        {children}
        <div >
          <button className="btn" onClick={() => { 
            
            mutate()
        setStartDirection(undefined)
        setEndDirection(undefined)
      setDistance({
        kms:undefined,
        minutes:undefined
    })
          
          }} >salir</button>
        </div>
      </div>
      
    </div>
  );
};
