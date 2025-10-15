import React, { useState } from "react";

import axios from "axios";

import ContainerLayout from "Components/UI/Admin/ContainerLayout/ContainerLayout";
import SearchInput from "Components/UI/Admin/SearchInput/SearchInput";

import AddIcon from "Assets/Icons/AddIcon";
import FoodListTable from "Components/UI/Admin/Tables/FoodListTable";

import { useAdminContext } from "Context/AdminContext/AdminContext";
import LoadingIcon from "Assets/Icons/LoadingIcon";

const DashboardFoodLayout = ({
  title,
  description,
  tableData,
  buttonTitle,
  setTableData,
  apiUrl,
}) => {
  const { setModal, setModalTitle, setAddedFoodData } = useAdminContext();

  const [inputText, setInputText] = useState("");

  const filteredData = tableData?.filter((item) => {
    if (inputText === "") {
      return item;
    } else {
      return item?.name?.toLowerCase().includes(inputText);
    }
  });

  const deleteListHandler = async (id) => {
    await axios.delete(apiUrl + id).catch((err) => console.log(err));

    const deleted = tableData?.filter((item) => item._id !== id);
    setTableData(deleted);
  };

  const addBtnHandler = () => {
    setModal(true);
    setModalTitle(buttonTitle);
    setAddedFoodData(tableData);
  };

  const tableHeadLabels = [
    "id",
    "photo",
    "name",
    "available",
    "price",
    "created at",
    "action",
  ];

  return (
    <div>
      <ContainerLayout title={title} description={description}>
        <div className="flex items-center justify-between">
          <SearchInput
            placeholder="Search Customer by name..."
            setInputText={setInputText}
          />

          <button
            onClick={addBtnHandler}
            className=" text-[1.1em] group font-semibold my-2 inline-flex items-center gap-3 bg-[#084942] active:bg-[#c75454] hover:bg-[#c75454] text-white rounded-md shadow-md p-3"
            to="create-customer"
          >
            <AddIcon />
            {buttonTitle}
          </button>
        </div>
        {!filteredData ? (
          <LoadingIcon />
        ) : filteredData?.length > 0 ? (
          <FoodListTable
            tableData={filteredData}
            tableHeadLabels={tableHeadLabels}
            itemsPerPage={3}
            deleteListHandler={deleteListHandler}
            showEditBtn
          />
        ) : (
          <h3 className="text-center text-[1.5em] py-[5em]">No Items Found!</h3>
        )}
      </ContainerLayout>
    </div>
  );
};

export default DashboardFoodLayout;
