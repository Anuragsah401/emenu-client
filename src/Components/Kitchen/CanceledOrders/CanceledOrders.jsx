import React, { useState, useEffect } from "react";

import { useKitchenContext } from "Context/KitchenContext/KitchenContext";
import LoadingIcon from "Assets/Icons/LoadingIcon";
import OrderListTable from "../../UI/Admin/Tables/OrderListTable";

const CanceledOrders = () => {
    const { orderData, loading } = useKitchenContext();

  const tableHeadLabels = [
    "Order ID",
    "Table no.",
    "Orders",
    "Order Date",
    "Order Price",
    "Order Status",
  ];

  const canceledOrderData = orderData?.filter(
    (item) => item.orderStatus === "canceled"
  );

  return (
    <>
    {loading ? (
      <LoadingIcon />
    ) : canceledOrderData?.length > 0 ? (
      <OrderListTable
        tableHeadLabels={tableHeadLabels}
        tableData={canceledOrderData}
        itemsPerPage={3}
        hideAction="true"
      />
    ) : (
      <h3 className="text-center text-[1.5em] py-[5em]">Canceled orders not Found!</h3>
    )}
  </>
  )
}

export default CanceledOrders