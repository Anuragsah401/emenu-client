import React, { useState, useEffect } from "react";

import axios  from "axios";

import ContainerTitle from "Components/UI/Admin/ContainerTitle/ContainerTitle";
import SearchInput from "Components/UI/Admin/SearchInput/SearchInput";
import FoodListTable from "Components/UI/Admin/Tables/FoodListTable";

import { useAxios } from "Hooks/useAxios";
import LoadingIcon from "Assets/Icons/LoadingIcon";

const FoodCompLayout = ({
  tableHeadLabels,
  title,
  placeholder,
  category
}) => {
  const { response, loading, error } = useAxios({ url: "/api/food" });

  const [tableData, setTableData] = useState([]);

    useEffect(() => {
        if (response !== null) {
          const filteredFoodItem = response?.filter(food => food.category === category)
          setTableData(filteredFoodItem);
        }
    }, [response, category]);

  const [inputText, setInputText] = useState("");

  const filteredData = tableData?.filter((item) => {
    if (inputText === "") {
      return item;
    } else {
      return item.name.toLowerCase().includes(inputText);
    }
  });

  const deleteListHandler = async (id) => {
    await axios.delete(`/api/food/` + id).catch((err) => console.log(err));

    const deleted = tableData.filter((item) => item._id !== id);
    setTableData(deleted);
  };

  return (
    <>
      <div className="flex justify-between">
        <ContainerTitle title={title} gap="gap-[2em]" />
        <SearchInput placeholder={placeholder} setInputText={setInputText} />
      </div>

      {loading ? (
        <LoadingIcon />
      ) : tableData?.length > 0 ? (
        <FoodListTable
          itemsPerPage={4}
          tableHeadLabels={tableHeadLabels}
          tableData={filteredData}
          deleteListHandler={deleteListHandler}
        />
      ) : (
        <h3 className="text-center text-[1.5em] py-[5em]">No Result Found!</h3>
      )}
    </>
  );
};

export default FoodCompLayout;
