
import { UseQueryResult } from "@tanstack/react-query";
import { useState } from "react";

interface Props{
    currentPage:number
    setCurrentPage:React.Dispatch<React.SetStateAction<number>>
    query:UseQueryResult<any, unknown>
    limit:number,
    setLimit:React.Dispatch<React.SetStateAction<number>>

}
export const Pagination = ({currentPage, setCurrentPage, query, limit, setLimit}:Props) => {


  const nextPage = () => {
    const nextPageLimit = currentPage + 25;
  
    if (nextPageLimit >= query.data?.records!) {
      const remainingRecords = query.data?.records! - currentPage;

      setCurrentPage(currentPage + remainingRecords);
      setLimit(remainingRecords);
    } else {
      setCurrentPage(nextPageLimit);
      setLimit(25);
    }
  };
  
  


  const previousPage = () => {
    if (currentPage  == query.data?.records!) 
    {
      setCurrentPage(currentPage - limit)
    }else{
      setCurrentPage(currentPage  - 25)
    }
    
  };


  return (
    <div className="flex justify-center gap-4 my-2">
      <button className="btn" onClick={previousPage} disabled={query.isPreviousData || currentPage < limit || query.isError || query.isLoading }>
        Pagina Anterior
      </button>
      <button className="btn" onClick={nextPage} disabled={query.isPreviousData || currentPage + limit >= query.data?.records! || query.isError || query.isLoading }>
        Pagina Siguiente
      </button>
    </div>
  );
};
