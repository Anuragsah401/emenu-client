import React, { useContext, useState, useEffect } from "react";

import axios from "axios";
import { io } from "socket.io-client";
import {notify} from "Components/UI/Toast/Toast";


const foodOrderContext = React.createContext();

export function useFoodOrder() {
  return useContext(foodOrderContext);
}

const socket = io('http://localhost:4000');

export const FoodOrderProvider = ({ children }) => {
  const [orderListItem, setOrderListItem] = useState([]);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {
    setLoading(true);

    axios
      .get("/api/orderlist")
      .then((res) => {
        setOrderListItem(res?.data);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      })
      .finally(() => setLoading(false));
  },[]);

  useEffect(() => {
    socket.on('update order', (updatedOrder) => { 
      setOrderListItem(prev => prev.map((order) => (order._id === updatedOrder._id ? updatedOrder : order)))
    });
  }, []);

  const deleteListHandler = async (id) => {
    const updated = { isCanceled: true };

    if (updated) {
      await axios
        .patch(`/api/orderlist/updatecancel/${id}`, updated)
        .then((response) => {
          notify(`order removed!`);
        });
    }

    const deleted = orderListItem?.filter((item) => item._id !== id);
    setOrderListItem(deleted);
  };

  return (
    <foodOrderContext.Provider
      value={{
        orderListItem,
        setOrderListItem,
        setIsOrderPlaced,
        isOrderPlaced,
        deleteListHandler,
        loading,
        notificationList,
        setNotificationList,
      }}
    >
      {children}
    </foodOrderContext.Provider>
  );
};
