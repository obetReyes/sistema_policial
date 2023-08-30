import { useState, useEffect} from "react";
import { Pagination, TablesLayout } from "../../../components";
import { SummaryModal } from "../components/SummaryModal";
import { SummariesTable } from "../components/SummariesTable";
import { useContext } from "react";
import { UserContext } from "../../../contexts";
import { useRecords, useSearchRecords,} from "../../../hooks/";
import { SummariesResI } from "../../../helpers";
import { useForm } from "react-hook-form";
import { Outlet } from "react-router-dom";

export const AllSummariesPage = () => {

  const { role } = useContext(UserContext);
  const {
    currentPage: currentPageAll,
    setCurrentPage: setCurrentPageAll,
    recordsQuery,
    limit:limitRecords,
    setLimit:setLimitRecords
  } = useRecords<SummariesResI>("summaries");

  const {
    param,
    searchRecordsQuery,
    currentPage: currentPageSearch,
    setCurrentPage: setCurrentPageSearch,
    setParam,
    limit:limitSearch,
    setLimit:SetLimitSearch
  } = useSearchRecords<SummariesResI>("summaries", "FoundSummaries");
 
  const { register, handleSubmit, reset } = useForm({
    mode: "onSubmit",
  });

  const [filtered, SetFiltered] = useState(recordsQuery);

  const onSubmit = handleSubmit(async (data, e) => {
    setParam({ [data.param]: data.searchRecords });
  });

const clearSearch = () => {
    reset();
    setParam({});
    SetFiltered(recordsQuery);
    if (searchRecordsQuery.data?.message.length == 0) {
      SetFiltered(recordsQuery);
    }
  };

  
  const paramHandler = () => {
    if( Object.keys(param).length > 0){
      return true
    }
  };
   useEffect(() => {
    if (Object.keys(param).length > 0) {
      SetFiltered(searchRecordsQuery);
    } else {
      SetFiltered(recordsQuery);
    }
  }, [
    filtered.data,
    param,
    setParam,
    searchRecordsQuery.data,
    recordsQuery.data,
    SummaryModal,
  ]);

  return (
    <TablesLayout roles={["OPERATOR", "DISPATCHER"]}>
      <h1 className="fixed left-6 font-semibold text-2xl text-warning top-4">
        sumarios
      </h1>
     <Outlet/>
      <div className="h-20 my-2 flex justify-around md:w-10/12 lg:w-8/12 items-center">
        <form className="flex items-center gap-4" onSubmit={onSubmit}>
          <input
            autoComplete="off"
            type="text"
            placeholder="barra de busqueda"
            className="input  text-yellow-400 font-semibold input-bordered mx-auto w-[25rem]"
            {...register("searchRecords")}
            required
            minLength={6}
          />
          <select
            id="param"
            {...register("param")}
            className="select select-bordered "
            name="param"
            required
          >
        <option value="dispatcher">emisario</option>
            <option value="incident">incidente</option>
          </select>
          {paramHandler() ? (
            <button className="btn btn-outline" onClick={clearSearch}>
              eliminar busqueda
            </button>
          ) : (
            <input className="btn btn-outline" type="submit" value="buscar" />
          )}
        </form>

        {role == "DISPATCHER" && <SummaryModal param={param} />}
      </div>
      <div className="md:w-10/12 lg:w-8/12">
      <SummariesTable query={filtered} />
            <Pagination
              currentPage={   Object.keys(param).length > 0 ? currentPageSearch : currentPageAll}
              setCurrentPage={Object.keys(param).length > 0
                ? setCurrentPageSearch
                : setCurrentPageAll}
                limit={  Object.keys(param).length > 0
                  ? limitSearch
                  : limitRecords
                }
                setLimit={Object.keys(param).length > 0
                ? SetLimitSearch : setLimitRecords}
              query={filtered}
            />
      </div>
    </TablesLayout>
  );
  return(
    <div>hopla</div>
  )
};
