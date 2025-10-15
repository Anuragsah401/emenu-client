import React, { useState } from "react";
import { NavLink, useOutletContext } from "react-router-dom";

import axios from "axios";

import CutomerListTable from "Components/UI/Admin/Tables/CutomerListTable";
import SearchInput from "Components/UI/Admin/SearchInput/SearchInput";

import AddIcon from "Assets/Icons/AddIcon";
import LoadingIcon from "Assets/Icons/LoadingIcon";

const CustomerList = () => {
  const [tableHeadLabels, tableData, setTableData, loading] =
    useOutletContext();

  const [inputText, setInputText] = useState("");

  const filteredData = tableData?.filter((item) => {
    if (inputText === "") {
      return item;
    } else {
      return item.username.toLowerCase().includes(inputText);
    }
  });

  const deleteListHandler = async (id) => {
    await axios.delete("/api/customer/" + id).catch((err) => console.log(err));

    const deleted = tableData.filter((item) => item._id !== id);
    setTableData(deleted);
  };

  return (
    <>
      <p className="text-[1.2em] text-center mt-4 mb-6">
        Users/customer are number of devices connected
      </p>

      <div className="flex items-center justify-between">
        <SearchInput
          placeholder="Search Customer by name..."
          setInputText={setInputText}
        />

        <NavLink
          className="group font-semibold my-2 inline-flex items-center gap-3 bg-[#084942] active:bg-[#c75454] hover:bg-[#c75454] text-white rounded-md shadow-md p-3"
          to="create-customer"
        >
          <AddIcon />
          <h4 className="text-[1.1em]">Create user/customer</h4>
        </NavLink>
      </div>

      {loading ? (
        <LoadingIcon />
      ) : filteredData?.length > 0 ? (
        <CutomerListTable
          tableData={filteredData}
          tableHeadLabels={tableHeadLabels}
          itemsPerPage={3}
          deleteListHandler={deleteListHandler}
        />
      ) : (
        <h3 className="text-center text-[1.5em] py-[5em]">No Result Found!</h3>
      )
      }
    </>
  );
};

export default CustomerList;
