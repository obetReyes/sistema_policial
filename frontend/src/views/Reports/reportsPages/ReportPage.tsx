import { useParams, useNavigate } from "react-router-dom";
import { ReportResI, customDate, customHour } from "../../../helpers";
import { useRecord } from "../../../hooks";
export const ReportPage = () => {
  const { reporteId } = useParams();
  const navigate = useNavigate();
  const reportQuery = useRecord<ReportResI>("reports","report", Number(reporteId));
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12/12 prose lg:prose-lg h-[50rem] overflow-y-auto">
          <h1>{`${Number(reporteId)}`}</h1>
          {reportQuery.isLoading ? <span className="loader"></span> : null}
          {reportQuery.isError ? <h1>{`${reportQuery.error}`}</h1> : null}

          <h1>Suceso: {reportQuery.data?.message?.event}</h1>
          <span className=" underline">
            creado el {customDate(reportQuery.data?.message?.createdAt)}{" "}
            {customHour(reportQuery.data?.message?.createdAt)}
          </span>

          <p>el reporte fue hecho por {reportQuery.data?.message?.userName}</p>
          <h2>Acciones llevadas a cabo</h2>
          <p>{reportQuery.data?.message?.actions}</p>
          <h2>resumen de lo sucedio</h2>
          <p className="pb-16">{reportQuery.data?.message?.summary}</p>

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
