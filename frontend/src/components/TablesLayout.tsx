import React, {useContext, useState, useEffect} from 'react'
import { UserContext } from '../contexts'
import { OfficerNavbar,DispatcherNavbar,OperatorNavbar } from './Navbars'
import { Table } from './Table'
import { ReportsTable } from '../views/Reports/components/ReportsTable'
import { NotFoundPage } from '../views'

interface Props{
  children:JSX.Element | JSX.Element []
  roles: string[]
}

export const TablesLayout = ({children, roles}:Props) => {
  const { role } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
      let isMounted = true;
        setIsLoading(false)
        
      return () => { isMounted = false; }
      
    }, [isLoading])
  return (
    <>
    {isLoading ? <span className='loader'></span>
    :
    
    roles.includes(role) ?   
    <div className='w-full h-screen p-4  overflow-y-hidden flex flex-col items-center  '>
      {role == "OFFICER" && <OfficerNavbar/>  }
    {role == "OPERATOR" && <OperatorNavbar/>  }
    {role == "DISPATCHER" && <DispatcherNavbar/>  }
      {children}
    </div>
    : <NotFoundPage/>
  }
    
    </>
  )
}
