import { useParams, useNavigate } from "react-router-dom";
import { GroupResI, UserResI, customDate, customHour } from "../../../helpers";
import { UserUpdateModal } from "../components/UserUpdateModal";
import { useRecord } from "../../../hooks";
import { useContext } from "react";
import { UserContext } from "../../../contexts";
export const UserPage = () => {
  const navigate = useNavigate();
  const { role } = useContext(UserContext);
  const { agente } = useParams();
  const agentQuery = useRecord<UserResI>("users", "user", String(agente));
  const userId = agentQuery.data?.message.name;
  const userRole = agentQuery.data?.message.role;
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className=" py-8 w-12/12 prose lg:prose-lg">
          <h1>{`${String(agente)}`}</h1>
          {agentQuery.isLoading ? <span className="loader"></span> : null}
          {agentQuery.isError ? <h1>{`${agentQuery.error}`}</h1> : null}

          {role == "OPERATOR" && <UserUpdateModal userId={userId!} role={userRole!} />}

          <p className=" underline">
            creado el {customDate(agentQuery.data?.message?.createdAt)}{" "}
            {customHour(agentQuery.data?.message?.createdAt)}
          </p>

          <p className=" underline">
            actualizado por ultima vez el{" "}
            {customDate(agentQuery.data?.message?.updatedAt)}{" "}
            {customHour(agentQuery.data?.message?.updatedAt)}
          </p>

          {agentQuery.data?.message.role == "OFFICER" && <p>oficial</p>}
          {agentQuery.data?.message.role == "DISPATCHER" && <p>emisario</p>}
          {agentQuery.data?.message.role == "OPERATOR" && <p>operador</p>}

          {agentQuery.data?.message.role == "OFFICER" && (
            <>
              <h2>grupo asignado:</h2>
              <p>{agentQuery.data?.message.group}</p>
            </>
          )}

          {agentQuery.data?.message.reports ? (
            <>
              <h2>reportes</h2>
              <p>{agentQuery.data?.message.reports}</p>
            </>
          ) : null}

          {agentQuery.data?.message.summaries ? (
            <>
              <h2>sumarios</h2>
              <p>{agentQuery.data?.message.summaries}</p>
            </>
          ) : null}
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
