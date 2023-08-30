import { UseQueryResult } from "@tanstack/react-query";
import {
  customDate,
  ErrorsI,
  UsersResI,
} from "../../../helpers";
import {UsersColumns} from "./UsersColumn"
import { Link } from "react-router-dom";

interface Props{
  query: UseQueryResult<UsersResI, unknown>
}

export const UsersTable = ({query}:Props) => {
  return(
    <div className="flex flex-col h-[42rem] overflow-auto">
      <table className="table table-zebra w-full">
        <UsersColumns/>
        <tbody>
          {query.isLoading && <tr className="loader"></tr>}
          {query.isError ? (
         
              <tr>
                <td colSpan={100}>{`${
                  (query.error as ErrorsI).response.data.message
                }`}</td>
              </tr>
            
          ) : query.data?.message  && query.data.message.length > 0 ? (
            query.data.message.map((user) => {
              return (
                <tr key={user.id}>
                  <td className="sm:w-1/6">{customDate(user.createdAt)}</td>
  
                  <td className="sm:w-1/6">{user.name}</td>
                  <td className="sm:w-1/6">{user.role}</td>
                  <td className="sm:w-1/6">{user.group}</td>
                  <td className="sm:w-1/6">{user.reports}</td>
                  <td className="sm:w-1/6">{user.summaries}</td>
                  <td className="sm:w-1/6">
                    <Link
                      className="btn btn-outline btn-sm"
                      to={`/agentes/${user.name}`}
                    >
                      ver agente
                    </Link>
                  </td>
                </tr>
              );
            })
          ) : !query.isLoading ?   (
            <tr>
              <td colSpan={100}>Sin resultados</td></tr>
          ) : null}
        </tbody>
      </table>
    </div>
  )
}
