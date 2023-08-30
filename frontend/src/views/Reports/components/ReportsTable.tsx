import { UseQueryResult } from "@tanstack/react-query";
import {
  customDate,
  customHour,
  ErrorsI,
  ReportsResI,
} from "../../../helpers";
import { ReportsColumns } from "./ReportsColumns";
import { Link } from "react-router-dom";

interface Props {
  query: UseQueryResult<ReportsResI, unknown>;
}

export const ReportsTable = ({ query  }: Props) => {


  return (
    <div className="flex flex-col h-[42rem] overflow-auto">
      <table className="table table-zebra w-full">
        <ReportsColumns />
        <tbody>
          {query.isLoading ? <tr className="loader"></tr> :
          query.isError ? (
         
              <tr>
                <td colSpan={100}>{`${
                  (query.error as ErrorsI).response.data.message
                }`}</td>
              </tr>
            
          ) : query.data?.message &&  query.data.message.length > 0 ? (
            query.data.message.map((report) => {
              const eventSummary = report.event.substring(0, 40);
              return (
                <tr key={report.id}>
                  <td className="sm:w-1/6">{customDate(report.createdAt)}</td>
                  <td className="sm:w-1/6">{customHour(report.createdAt)}</td>
                  <td className="sm:w-1/6">{eventSummary} ...</td>
                  <td className="sm:w-1/6">{report.userName}</td>
                  <td className="sm:w-1/6">
                    <Link
                      className="btn btn-outline btn-sm"
                      to={`/reportes/${report.id}`}
                    >
                      ver reporte
                    </Link>
                  </td>
                </tr>
              );
            })
          ) : !query.isLoading ?  (
            <tr>
              <td colSpan={100}>Sin resultados</td></tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
};
