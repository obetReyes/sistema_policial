import { useState } from "react";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useRecords = <T>(path: string) => {
  const axiosPrivate = useAxiosPrivate();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(25)
  const recordsQuery = useQuery(
    ["records", path, currentPage],
    async (): Promise<T> => {
      const { data } = await axiosPrivate.get<T>(`/${path}/`, {
        params: {
          limit:limit,
          starting_after:currentPage
        },
        
      });
      return data;
    },
    {
      retry:1,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );
  return {
    currentPage,
    setCurrentPage,
    recordsQuery,
    limit,
    setLimit
  };
};


export const useSearchRecords = <T>(path: string, cacheKey:string) => {
  const [param, setParam] = useState<{}>({});
  const axiosPrivate = useAxiosPrivate();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(25)
  const searchRecordsQuery = useQuery(
    ["searchRecords",cacheKey,path, param, currentPage],
    async (): Promise<T> => {
      const { data } = await axiosPrivate.get<T>(`/${path}/many`, {
        params:{  
          limit:limit,
          starting_after:currentPage,
          ...param
        }
      });
      return data;
    },
    {
      //refetchOnWindowFocus option is set to false to prevent the query from refetching

      refetchOnWindowFocus: false,
      retry: 1,
      enabled:Object.keys(param).length > 0, // use enabled flag
      /*enabled:Object.keys(param).length > 0 || currentPage > 0*/
    }
  );
  return {
    currentPage,
    setCurrentPage,
    searchRecordsQuery,
    param,
    setParam,
    limit,
    setLimit
   
  };
};

export const useRecord = <T>(path: string, route:string, id: number | string) => {
  const axiosPrivate = useAxiosPrivate();
  const recordQuery = useQuery(
    ["record", path, id],
    async (): Promise<T> => {
      const { data } = await axiosPrivate.get<T>(`/${path}/${route}/${id}`);
      //tengo que cheacar como llega la respuesta del id para ebvuarka
      console.log(data , "data")
    
      return data;
    },
    {

    }
  );
  return recordQuery;
};


//nened tocreate use record upaate Muatation to update modals
export const useRecordUpdateMutation = <T, U>(path:string, id:number | string) => {

  const axiosPrivate = useAxiosPrivate();
  const records = useQueryClient();
 const updateRecord = async(body:U): Promise<T> => {
  const { data } = await axiosPrivate.put<T>(`/${path}/`, body);
  console.log(data)
  return data;
 };
 const { mutate, error, isError, isLoading, isSuccess } = useMutation<T,
  unknown,
  U
  >(updateRecord, {
    onSuccess: (data) => {
      records.refetchQueries(["record", path, id])
    }
  })
  return{
    mutate,
    error,
    isError,
    isLoading,
    isSuccess
  }
}
export const useRecordMutation = <T, U>(path: string, cacheKey:string,id?:string) => {
  const axiosPrivate = useAxiosPrivate();
  const records = useQueryClient();

  const {currentPage:currentPageRecords} = useRecords(path)
  const {param, setParam, currentPage:currentPageSearch} = useSearchRecords(path, cacheKey)

  const createRecord = async (body: U): Promise<T> => {
    const { data } = await axiosPrivate.post<T>(`/${path}/`, body);
    return data;
  };
  const { mutate, error, isError, isLoading, isSuccess } = useMutation<
    T,
    unknown,
    U
  >(createRecord);
  return {
    mutate,
    error,
    isError,
    isLoading,
    isSuccess,
  };
};
