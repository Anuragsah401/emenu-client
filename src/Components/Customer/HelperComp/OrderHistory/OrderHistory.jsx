import React, { useState } from "react";

import { useParams } from "react-router-dom";

import OrderHistoryCard from "./OrderHistoryCard/OrderHistoryCard";
import { useFoodOrder } from "Context/CustomerContext/FoodOrderContext";
import LoadingIcon from "Assets/Icons/LoadingIcon";

const OrderHistory = ({
  setOpenCheckoutModal,
  setOpenLogoutModal,
  setBackDrop,
  setSideBar,
  setOrderId,
}) => {
  const { tableId } = useParams();
  const { orderListItem, loading } = useFoodOrder();

  const orderDataAccordingToTable = orderListItem?.filter(
    (item) => item.tableNo === tableId && item.isCheckout === false && item.isCanceled === false
  );

  let orderList;

  if (loading) {
    orderList = <LoadingIcon />;
  } else if (orderDataAccordingToTable?.length > 0) {
    orderList = orderDataAccordingToTable.map((item, index) => {
      return (
        <OrderHistoryCard
          key={index}
          index={index}
          foodList={item.foodList}
          date={item.createdAt}
          id={item._id}
          orderStatus={item.orderStatus}
          setOpenCheckoutModal={setOpenCheckoutModal}
          setOpenLogoutModal={setOpenLogoutModal} 
          setBackDrop={setBackDrop}
          setSideBar={setSideBar}
          setOrderId={setOrderId}
          selectedTime={item.timer}
        />
      );
    });
  } else {
    orderList = (
      <div className="text-center font-bold text-[1.5em] px-3 h-full flex justify-center items-center">
        Sorry, There are no orders out here!
      </div>
    );
  }

  return (
    <div className="h-full pb-8 overflow-x-scroll">
      <div className="text-center py-3 bg-black text-white">
        <h1>Your Order History</h1>
      </div>
      <div className="h-[70vh]">{orderList}</div>
    </div>
  );
};

export default OrderHistory;
