import React, { useState, useEffect } from "react";

import { useKitchenContext } from "Context/KitchenContext/KitchenContext";
import LoadingIcon from "Assets/Icons/LoadingIcon";
import OrderListTable from "../../UI/Admin/Tables/OrderListTable";

const CompletedOrders = () => {
  const { orderData, loading } = useKitchenContext();

  const tableHeadLabels = [
    "Order ID",
    "Table no.",
    "Orders",
    "Order Date",
    "Order Price",
    "Order Status",
  ];

  const completedOrderData = orderData?.filter(
    (item) => item.orderStatus === "completed"
  );

  return (
    <>
      {loading ? (
        <LoadingIcon />
      ) : completedOrderData?.length > 0 ? (
        <OrderListTable
          tableHeadLabels={tableHeadLabels}
          tableData={completedOrderData}
          itemsPerPage={3}
          hideAction="true"
        />
      ) : (
        <h3 className="text-center text-[1.5em] py-[5em]">No Result Found!</h3>
      )}
    </>
  );
};

export default CompletedOrders;
