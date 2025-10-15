import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { useAxios } from "Hooks/useAxios";
import axios from "axios";

import FoodListTable from "Components/UI/Admin/Tables/FoodListTable";
import ContainerLayout from "Components/UI/Admin/ContainerLayout/ContainerLayout";
import LoadingIcon from "Assets/Icons/LoadingIcon";

const SearchFood = () => {
  const { foodname } = useParams();
  const [tableData, setTableData] = useState([]);

  const { response, loading, error } = useAxios({
    url: "/api/food",
  });

  useEffect(() => {
    if (response !== null) {
      setTableData(response);
    }
}, [response]);


  const tableHeadLabels = [
    "ID",
    "Photo",
    "Name",
    "Available",
    "Price",
    "Created At",
    "Action",
  ];

  const filteredData = tableData?.filter((item) => {
    if (foodname === "") {
      return item;
    } else {
      return item.name.toLowerCase().includes(foodname);
    }
  });

  const deleteListHandler = async (id) => {
    await axios.delete(`/api/food/` + id).catch((err) => console.log(err));

    const deleted = tableData.filter((item) => item._id !== id);
    setTableData(deleted);
  };

  return (
    <ContainerLayout title="Search result">
      <div className="min-h-[30vh]">
        {loading ? (
          <LoadingIcon />
        ) : filteredData?.length > 0 ? (
          <FoodListTable
            tableData={filteredData}
            itemsPerPage={4}
            tableHeadLabels={tableHeadLabels}
            deleteListHandler={deleteListHandler}
          />
        ) : (
          <div className="text-center text-[2em] font-semibold mt-[2em]">
            No Result found!
          </div>
        )}
      </div>
    </ContainerLayout>
  );
};

export default SearchFood;
