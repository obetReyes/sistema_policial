import React, { useContext } from "react";
import { useForm } from "react-hook-form";

import { UserContext } from "../contexts";

interface Props {
  allowedRole: string;
  modal: JSX.Element;
  setParam: React.Dispatch<React.SetStateAction<{}>>;
  param: {};
}

export const Topbar = ({ allowedRole, modal, setParam, param }: Props) => {
  const { register, handleSubmit, reset } = useForm({
    mode: "onSubmit",
  });

  const { role } = useContext(UserContext);

  const onSubmit = handleSubmit(async (data, e) => {
    setParam({ [data.param]: data.searchRecords });
  });

  return (
    <div className="h-20 my-6 flex justify-around md:w-10/12 lg:w-8/12 items-center">
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
          <option value="officer">oficial</option>
          <option value="event">suceso</option>
        </select>
        {Object.keys(param).length === 1 ? (
          <button
            className="btn btn-outline"
            onClick={() => {
              reset();
              setParam({});
            }}
          >
            eliminar busqueda
          </button>
        ) : (
          <input className="btn btn-outline" type="submit" value="buscar" />
        )}
      </form>
      {allowedRole === role && modal}
    </div>
  );
};
