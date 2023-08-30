import { UseQueryResult } from "@tanstack/react-query";
import { customDate, customHour, SummariesResI } from "../../../helpers";
import { SummariesColumns } from "./SummariesColumns";
import { Link } from "react-router-dom";
import { ErrorsI } from "../../../helpers";

interface Props{
  query: UseQueryResult<SummariesResI, unknown>
}
export const SummariesTable = ({query}:Props) => {

  return (
 <div className="flex flex-col h-[42rem] overflow-x-hidden">
      <table className="table table-zebra w-full">
      <SummariesColumns/>
      <tbody>
        {query.isLoading && <tr className="loader"></tr>}
        {query.isError ?  <tr>
          <td colSpan={100}>{`${(query.error as ErrorsI).response.data.message}`}</td>
          </tr>
          : query.data?.message && query.data.message.length > 0 ? 
           query.data?.message.map((summarie) => {
            const eventSummary = summarie.incident.substring(0,40);
              return <tr key={summarie.id}>
                <td>{customDate(summarie.createdAt)}</td>
                <td>{customHour(summarie.createdAt)}</td>
                <td>{eventSummary} ...</td>
                <td>{summarie.userName}</td>
                <td>
                  <Link className="btn btn-outline btn-sm" to={`/sumarios/${summarie.id}`}>
                  ver sumario
                  </Link>
                  </td>
              </tr>
          })
        : !query.isLoading ? <tr>
        <td colSpan={100}>Sin resultados</td></tr> : null}
      </tbody>
    </table>
    </div>
  )
}
