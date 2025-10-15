import React from "react";
import { NavLink } from "react-router-dom";

import Title from "Components/UI/Title/Title";
import LoadingIcon from "Assets/Icons/LoadingIcon";
import BackToChooseUserBtn from "../../../Components/UI/BackToChooseUserBtn/BackToChooseUserBtn";

const ChooseTable = ({ tableData, loading, error }) => {
  return (
    <div className=" w-full text-center relative">
      <div className="text-center mt-10 mb-5">
        <Title text="E-menu system" />
      </div>

      <h2 className="text-[2.3rem] text-black">
        Choose Table Name to decide this device belongs to:
      </h2>

      {loading ? (
        <LoadingIcon />
      ) : (
        <div className="w-[80%] mx-auto">
          <ul className="flex gap-4 flex-wrap justify-center mt-[2rem]">
            {tableData?.map((table, i) => (
              
                <NavLink to={`/customer/login/${table.tableName}`} key={i}>
                  <button
                    disabled={table.status === "online"}
                    style={
                      table.status === "online"
                        ? { opacity: "0.5", cursor: "not-allowed" }
                        : null
                    }
                    className="group shadow-lg relative h-[180px] w-[250px] overflow-hidden rounded-lg bg-white text-lg capitalize"
                  >
                    <div className="absolute inset-0 transition-all duration-[250ms] ease-out group-hover:bg-[#20CFBA]"></div>
                    <span className="relative text-[25px] text-black group-hover:text-white">
                      {table.tableName}
                    </span>
                  </button>
                </NavLink>
              
            ))}
          </ul>
        </div>
      )}

      <div className="mt-5">
        <BackToChooseUserBtn>Back to choose user</BackToChooseUserBtn>
      </div>
    </div>
  );
};

export default ChooseTable;
