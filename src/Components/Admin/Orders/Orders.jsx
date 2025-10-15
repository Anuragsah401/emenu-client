import React, { useState, useEffect } from "react";
import { useAxios } from "Hooks/useAxios";
import axios from "axios";

import LoadingIcon from "Assets/Icons/LoadingIcon";

import PdfIcon from "Assets/Icons/PdfIcon";

import ContainerLayout from "Components/UI/Admin/ContainerLayout/ContainerLayout";
import SearchInput from "Components/UI/Admin/SearchInput/SearchInput";
import OrderListTable from "Components/UI/Admin/Tables/OrderListTable";

const Orders = () => {
  const tableHeadLabels = [
    "Order ID",
    "Table no.",
    "Orders",
    "Order Date",
    "Order Price",
    "Order Status",
    "Action",
  ];
  const { response, loading, error } = useAxios({ url: "/api/orderlist" });
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (response !== null) {
      setTableData(response);
    }
  }, [response]);

  const [inputText, setInputText] = useState("");

  const filteredData = tableData?.filter((item) => {
    if (inputText === "") {
      return item;
    } else {
      return item?.customer?.toLowerCase().includes(inputText);
    }
  });

  const deleteListHandler = async (id) => {
    await axios.delete("/api/orderlist/" + id).catch((err) => console.log(err));
    const deleted = tableData.filter((item) => item._id !== id);
    setTableData(deleted);
  };

  const title = "Order List";
  const description =
    "See number of food order list according to table numbers.";

  return (
    <ContainerLayout title={title} description={description}>
      <div className="flex justify-between">
        <SearchInput
          placeholder="Search for customer orders..."
          setInputText={setInputText}
        />
        <button className="py-1 px-2 bg-white rounded-md shadow-md flex items-center gap-2 hover:bg-[#C75454] hover:text-white">
          Export as pdf <PdfIcon />
        </button>
      </div>

      {loading ? (
        <LoadingIcon />
      ) : filteredData?.length > 0 ? (
        <OrderListTable
          tableHeadLabels={tableHeadLabels}
          tableData={filteredData}
          itemsPerPage={3}
          deleteListHandler={deleteListHandler}
          hideAction = "false"
        />
      ) : (
        <h3 className="text-center text-[1.5em] py-[5em]">No Result Found!</h3>
      )}
    </ContainerLayout>
  );
};

export default Orders;
