import React, { useState } from "react";

import EatIcon from "Assets/Icons/EatIcon";
import MaximizeIcon from "Assets/Icons/MaximizeIcon";
import MinimizeIcon from "Assets/Icons/MinimizeIcon";

import { useKitchenContext } from "Context/KitchenContext/KitchenContext";
import Timer from "./Timer";


import './ActiveEffect.css'

const FoodOrderCard = ({ data, cancelOrderHandler, orderId, orderStatus, timer }) => {
  const { updateOrderList, startOrder, changeOrderStatusToComplete } =
    useKitchenContext();

  const [toggleMinimizeButton, setToggleMaximizeButton] = useState(false);
  const [IsOrderStarted, setOrderStarted] = useState(false);

  const [countdowntTime, setCountdowntTime] = useState(timer)

  const orderDate = new Date(data.createdAt);
  let time = orderDate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  let day = orderDate.toLocaleDateString("en-US", { weekday: "long" });
  const isFoodItemComplete = data.foodList.every((item) => item.completed);

  const toggleMinimizeHandler = () => {
    setToggleMaximizeButton((prev) => {
      return !prev;
    });
  };

  const handleCheckBox = (foodId) => {
    updateOrderList(orderId, foodId);
  };

  const handleStartOrder = (orderId) => {
    startOrder(orderId);
    setOrderStarted(true);
  };

  return (
    <div className={`${IsOrderStarted || orderStatus === "started" ? "glowing-btn" : null} w-[300px] h-fit border-2 border-[black] px-2 py-1 rounded-md`}>
      <div className="flex justify-between items-center cursor-move">
        <div>
          <EatIcon />
        </div>
        <div className="text-[1.5em] font-semibold capitalize">
          {data.tableNo}
        </div>
        <button onClick={toggleMinimizeHandler}>
          {toggleMinimizeButton ? <MinimizeIcon /> : <MaximizeIcon />}
        </button>
      </div>
      <div
        className={`bg-[#fff] p-2 mt-2  min-h-[105px] ${
          toggleMinimizeButton ? "" : "h-[105px]"
        } overflow-y-scroll`}
      >
        <ul className="flex flex-col gap-2 capitalize">
          {data.foodList.map((order, i) => {
            return (
              <li key={`food-${i}`} className="flex justify-between">
                <label htmlFor="foodItem">
                  {order.name} (X{order.amount})
                </label>

                {IsOrderStarted || orderStatus === "started" ? (
                  <input
                    type="checkbox"
                    defaultChecked={order.completed}
                    className="w-5 h-5 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                    onChange={() => handleCheckBox(order._id)}
                  />
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="text-center my-2 font-semibold">
        {day} - {time}
      </div>

      <div className="flex justify-between mt-2">
        {!isFoodItemComplete ? (
          <>
            <button
              disabled={IsOrderStarted}
              style={
                IsOrderStarted || orderStatus === "started"
                  ? { opacity: "0.4", cursor: "not-allowed" }
                  : null
              }
              onClick={() => handleStartOrder(orderId)}
              className="text-center shadow-md py-2 px-3 font-semibold bg-[#3bb450] rounded-sm active:bg-red-500 hover:scale-[1] text-white mb-1"
            >
              Start Order
            </button>
            <button
            // style={
            //    countdowntTime !== 0
            //     ? { opacity: "0.4", cursor: "not-allowed" }
            //     : null
            // }
           
              onClick={() => cancelOrderHandler(data?._id)}
              className="shadow-md gap-4 py-2 px-3 font-semibold active:bg-red-500 bg-[#c22d2d] rounded-sm hover: text-white mb-1"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => changeOrderStatusToComplete(orderId)}
            className="flex-1 text-center shadow-md py-2 px-3 font-semibold bg-[#3bb450] rounded-sm active:bg-red-500 hover:scale-[1] text-white mb-1"
          >
            Done
          </button>
        )}
      </div>

      {/* {countdowntTime !== 0 ? <Timer time={countdowntTime} setTime={setCountdowntTime}/> : null} */}
    </div>
  );
};

export default FoodOrderCard;
