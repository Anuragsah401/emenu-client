import React, { useEffect } from "react";

import axios from "axios";

import { useFoodOrder } from "Context/CustomerContext/FoodOrderContext";

const Timer = ({ time, setTime, id, selectedTime }) => {
  const { orderListItem } = useFoodOrder();

  useEffect(() => {
    let timer;

    if (time > 0) {
      timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [time]);

  useEffect(() => {
    if (id && selectedTime !== 0) {
      const updated = { timer: time };
      axios
        .patch(`/api/orderlist/updatelist/${id}`, updated)
        .then((response) => {
        //   console.log(response);
          //   notify(`Order from ${updated.tableNo} has been canceled!`);
        });
    }
  }, [time, id, orderListItem, selectedTime]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  if (time === 0) {
    return null;
  }

  return (
    <div className="py-2 text-center bg-[#837c7c] text-white w-full active:bg-[red]">
      Time Remaining for canceling or editing: {formatTime(time)}
    </div>
  );
};

export default Timer;
