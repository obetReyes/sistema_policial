import { UseQueryResult } from "@tanstack/react-query";
import {
  customDate,
  customHour,
  ErrorsI,
  GroupsResI,
} from "../../../helpers";
import { GroupsColumns } from "./GroupsColumn";
import { Link } from "react-router-dom";

interface Props {
  query: UseQueryResult<GroupsResI, unknown>;
}


export const GroupsTable = ({ query  }: Props) => {
  return (
    <div className="flex flex-col h-[42rem] overflow-auto">
      <table className="table table-zebra w-full">
        <GroupsColumns/>
        <tbody>
          {query.isLoading && <tr className="loader"></tr>}
          {query.isError ? (
         
              <tr>
                <td colSpan={100}>{`${
                  (query.error as ErrorsI).response.data.message
                }`}</td>
              </tr>
            
          ) : query.data?.message &&  query.data.message.length > 0 ? (
            query.data.message.map((group) => {
              const eventSummary = group.area.substring(0, 40);
              return (
                <tr key={group.id}>
                  <td className="sm:w-1/6">{customDate(group.createdAt)}</td>
                  <td className="sm:w-1/6">{customHour(group.createdAt)}</td>
                  <td className="sm:w-1/6">{group.name}</td>
                  <td className="sm:w-1/6">{group.users}</td>
                  <td className="sm:w-1/6">
                    <Link
                      className="btn btn-outline btn-sm"
                      to={`/grupos/${group.id}`}
                    >
                      ver grupo
                    </Link>
                  </td>
                </tr>
              );
            })
          ) : !query.isLoading ? (
            <tr>
              <td colSpan={100}>Sin resultados</td></tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );

}