import { useContext, useEffect } from "react";
import { MapContext, UserContext } from "../contexts";
import { Routes, Route } from "react-router-dom";
import { MapPage, NotFoundPage, AllReportsPage, SignInPage, SingUpPage,ReportPage, AllSummariesPage, SummariePage, AllUsersPage, UserPage, AllGroupsPage, GroupPage } from "../views";
export const AppRouter = () => {
  const {user, role} = useContext(UserContext);
  return (
    <Routes> 
    {user  ? 
    <>
      <Route   index element={<MapPage/>} />
      <Route path="reportes" element={  <AllReportsPage />}>
      <Route path=":reporteId" element={  <ReportPage />} />
      </Route>
    
      <Route path="sumarios" element={<AllSummariesPage/>}>
      <Route path=":sumarioId" element={<SummariePage/>} />
      </Route>

      <Route path="grupos" element={<AllGroupsPage/>}>
      <Route path=":grupoId" element={<GroupPage/>} />
      </Route>

      <Route path="agentes" element={<AllUsersPage/>}>
      <Route path=":agente" element={<UserPage/>} />
        </Route>
    </>
      :
      <>
    <Route path='/' element={<SignInPage/>} />
    <Route path='/crear/operador' element={<SingUpPage/>} />
    </>
    }
     <Route path="*" element={<NotFoundPage/>} /> 
    </Routes>
  )
}
