import React, { useState } from "react";
import axios from "axios";

import CountDownTimer from "./CountDownTimer";
import { notify } from "Components/UI/Toast/Toast";

import "./OrderHistoryCard.css";
import { useFoodOrder } from "Context/CustomerContext/FoodOrderContext";

const OrderHistoryCard = ({
  date,
  foodList,
  id,
  orderStatus,
  setOpenCheckoutModal,
  setOpenLogoutModal,
  setBackDrop,
  setSideBar,
  setOrderId,
  selectedTime,
}) => {
  const { deleteListHandler } = useFoodOrder();
  const [timer, setTimer] = useState(selectedTime);

  const cancelOrderHandler = async (id) => {
    const updated = { orderStatus: "canceled" };

    if (updated) {
      await axios
        .patch(`/api/orderlist/updatelist/${id}`, updated)
        .then((response) => {
          setTimer(0);
          notify(`You canceled the order!`);
        });
    }

    // const deleted = orderListItem.filter((item) => item._id !== id);
    // setorderData(deleted);
  };

  const orderDate = new Date(date);

  let time = orderDate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  let day = orderDate.toLocaleDateString("en-US", { weekday: "long" });

  const totalPrice = foodList
    .map((foodItem) => foodItem.price)
    .reduce((a, b) => a + b, 0);

  const getTextColorConditionally = (orderStatus) => {
    switch (orderStatus) {
      case "pending":
        return <span className="text-[#8a8a1e]">{orderStatus}...</span>;
      case "started":
        return <span className="text-[blue]">{orderStatus}...</span>;

      case "canceled":
        return <span className="text-[red]">{orderStatus}</span>;

      case "completed":
        return <span className="text-[green]">{orderStatus}</span>;

      default:
        return <span>{orderStatus}</span>;
    }
  };

  const ChekoutModalHandler = () => {
    setBackDrop(false);
    setSideBar(false);
    setOpenCheckoutModal(true);
    setOpenLogoutModal(false);
    setOrderId(id);
  };

  return (
    <div className="w-full mb-2">
      <section className="shadow row border-b-2 border-cyan-900">
        <div className="tabs">
          <div className="border-b tab">
            <div className="border-l-2 border-transparent relative">
              <input
                className="w-full absolute z-10 cursor-pointer opacity-0 h-10 top-6 "
                type="checkbox"
                id="chck1"
              />
              <header
                className=" p5 px-5 cursor-pointer select-none tab-label mb-2"
                htlmfor="chck1"
              >
                <div className="text-center py-2 underline capitalize underline-offset-8">
                  Order Status: {getTextColorConditionally(orderStatus)}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-grey-darkest font-semibold text-xl">
                    {day} - {time}
                  </span>

                  <div className="rounded-full border border-grey w-7 h-7 flex items-center justify-center test">
                    <svg
                      aria-hidden="true"
                      className=""
                      data-reactid="266"
                      fill="none"
                      height="24"
                      stroke="#606F7B"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
              </header>
              <div className="tab-content">
                <div className="px-5 pb-5 text-grey-darkest">
                  <ul>
                    {foodList.map((item, index) => (
                      <li className="pb-2 flex justify-between" key={index}>
                        <span>
                          {item.name} ({item.amount})
                        </span>
                        <span>${item.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between  px-5 py-2 font-bold text-red-500 border-black border-t-2">
                  <span className="text-grey-darkest">Total</span>
                  <span className="text-grey-darkest">${totalPrice}</span>
                </div>

                {
                  // timer !== 0 &&
                  orderStatus !== "canceled" &&
                  orderStatus !== "completed" &&
                  orderStatus !== "started" ? (
                    <div className="flex items-center border-y-2 border-white">
                      <button
                        onClick={() => cancelOrderHandler(id)}
                        className="px-2 py-3 block w-[100%] bg-red-500 text-white"
                      >
                        Cancel Your order!
                      </button>
                      {/* <button className="px-2 py-3 block w-[50%] bg-green-500 text-white">
                        Edit
                      </button> */}
                    </div>
                  ) : null
                }

                {orderStatus === "canceled" ? (
                  <button
                    onClick={() => deleteListHandler(id)}
                    className="py-2 text-center text-white w-full active:bg-[red] bg-red-500"
                  >
                    remove
                  </button>
                ) : (
                  <button
                    onClick={ChekoutModalHandler}
                    disabled={
                      orderStatus === "pending" || orderStatus === "started"
                    }
                    style={
                      orderStatus === "pending" || orderStatus === "started"
                        ? { opacity: "0.5", cursor: "not-allowed" }
                        : null
                    }
                    className="py-2 text-center bg-[#837c7c] text-white w-full active:bg-[red]"
                  >
                    Checkout
                  </button>
                )}

                {/* {orderStatus !== "canceled" ? (
                  <CountDownTimer
                    time={timer}
                    setTime={setTimer}
                    id={id}
                    selectedTime={selectedTime}
                  />
                ) : null} */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderHistoryCard;
