import React, { useContext, useState } from 'react'
import { UserContext } from '../../../contexts'

export const FristTImeDirectionsGuide = () => {
  const { isUserFristTime} = useContext(UserContext)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true)
  return (
   <>
   {isUserFristTime && isModalOpen ? 
        <div className="alert w-4/12 alert-warning  absolute top-2 z-50 right-2 flex  flex-col gap-0">
  
  <svg className="self-end absolute cursor-pointer" width="24" height="24" viewBox="0 0 24 24" onClick={() => setIsModalOpen(false)} fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.3956 7.75734C16.7862 8.14786 16.7862 8.78103 16.3956 9.17155L13.4142 12.153L16.0896 14.8284C16.4802 15.2189 16.4802 15.8521 16.0896 16.2426C15.6991 16.6331 15.0659 16.6331 14.6754 16.2426L12 13.5672L9.32458 16.2426C8.93405 16.6331 8.30089 16.6331 7.91036 16.2426C7.51984 15.8521 7.51984 15.2189 7.91036 14.8284L10.5858 12.153L7.60436 9.17155C7.21383 8.78103 7.21383 8.14786 7.60436 7.75734C7.99488 7.36681 8.62805 7.36681 9.01857 7.75734L12 10.7388L14.9814 7.75734C15.372 7.36681 16.0051 7.36681 16.3956 7.75734Z" fill="currentColor" /><path fillRule="evenodd" clipRule="evenodd" d="M4 1C2.34315 1 1 2.34315 1 4V20C1 21.6569 2.34315 23 4 23H20C21.6569 23 23 21.6569 23 20V4C23 2.34315 21.6569 1 20 1H4ZM20 3H4C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4C21 3.44772 20.5523 3 20 3Z" fill="currentColor" /></svg>
  <span>para calcular distancias</span>
  <span><b> da click en el boton "calcular distancias".</b>.</span>
 
    <span className='text-center'>
    al dar doble click sobre alguna superficie en el mapa asignas los puntos de inicio y final
    </span>
</div> : 
null
}
   </>
  )
}
