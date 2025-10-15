import React from "react";

import FoodOrderCard from "./FoodOrderCard";
import { useKitchenContext } from "Context/KitchenContext/KitchenContext";
import LoadingIcon from "Assets/Icons/LoadingIcon";



const Orders = () => {
  const { orderData, cancelOrderHandler, loading } = useKitchenContext();

  const pendindOrderData = orderData?.filter(
    (item) => item.orderStatus === "started" || item.orderStatus === "pending"
  );

  if (loading) {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
        <LoadingIcon />
      </div>
    );
  } else if (pendindOrderData?.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-[80vh] text-[2em] font-semibold">
        There are no orders out here!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-content-stretch justify-items-center gap-4">
      {pendindOrderData?.map((data) => (
        <FoodOrderCard
          key={data._id}
          data={data}
          cancelOrderHandler={cancelOrderHandler}
          orderId={data._id}
          orderStatus={data.orderStatus}
          timer={data.timer}
        />
      ))}
      
    </div>
  );
};

export default Orders;
