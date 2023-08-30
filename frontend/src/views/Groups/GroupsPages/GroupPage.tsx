import { useParams, useNavigate } from "react-router-dom";
import { GroupResI, customDate, customHour } from "../../../helpers";
import { useRecord } from "../../../hooks";
import { Link } from "react-router-dom";
import { GroupUpdateModal } from "../components/GroupsUpdateModal";
import { useContext } from "react";
import { UserContext } from "../../../contexts";
export const GroupPage = () => {
  const {role} = useContext(UserContext)
  const { grupoId } = useParams();
  const navigate = useNavigate();
  const groupQuery = useRecord<GroupResI>("groups", "group", Number(grupoId));
  const groupName = groupQuery.data?.message.name; // Get the groupName from the groupQuery data
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">

        <div className=" w-12/12 prose lg:prose-lg h-[50rem] overflow-y-auto">
          {groupQuery.isLoading ? <span className="loader"></span> : null}
          {groupQuery.isError ? <h1>{`${groupQuery.error}`}</h1> : null}

          <h1>{groupQuery.data?.message.name}</h1>
       {role == "OPERATOR" &&  groupName && <GroupUpdateModal groupId={Number(grupoId)} groupName={groupName} />}
          <span className=" underline">
            creado el {customDate(groupQuery.data?.message?.createdAt)}{" "}
            {customHour(groupQuery.data?.message?.createdAt)}
          </span>

          <p>
            el area asignada es {" "}
            <b className="underline text-yellow-400">
              {groupQuery.data?.message.area}
            </b>
          </p>

          <h2>agentes asignados al grupo:</h2>
          <div className="flex flex-col h-[25rem] overflow-auto">
                  <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>nombre</th>
                      <th>reportes</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
            {groupQuery.data?.message.users.map((user) => {
              return (
              
                    <tr key={user.name}>
                      <td className="sm:w-1/6 underline font-semibold text-warning">
                    {user.name}
                      </td>
                      <td className="sm:w-1/6">
                    {user.reports}
                      </td>
                      <td><Link to="/"  className="btn  btn-sm">ver localizacion</Link></td>
                      <td><Link to="/"  className="btn  btn-sm">ver reportes</Link></td>
                    </tr>
              );
            })}
        </tbody>
                  </table>
                </div>
        

          <div
            className="fixed flex items-center gap-4 top-8 right-12 hover:text-gray-500 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <button className="">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.9481 14.8285L10.5339 16.2427L6.29126 12L10.5339 7.7574L11.9481 9.17161L10.1197 11H17.6568V13H10.1197L11.9481 14.8285Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M23 19C23 21.2091 21.2091 23 19 23H5C2.79086 23 1 21.2091 1 19V5C1 2.79086 2.79086 1 5 1H19C21.2091 1 23 2.79086 23 5V19ZM19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            <a>volver atras</a>
          </div>
        </div>
      </div>
    </>
  );
};
