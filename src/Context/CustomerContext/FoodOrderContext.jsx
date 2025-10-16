import React, { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import api from "utils/axiosConfig";
import { notify } from "Components/UI/Toast/Toast";

const FoodOrderContext = createContext();

export function useFoodOrder() {
  return useContext(FoodOrderContext);
}

// Initialize Socket.io
const socket = io(process.env.REACT_APP_SERVER_API, {
  transports: ["websocket"],
});

export const FoodOrderProvider = ({ children }) => {
  const [orderListItem, setOrderListItem] = useState([]);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notificationList, setNotificationList] = useState([]);

  // Fetch orders once
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await api.get("/api/orderlist");
        setOrderListItem(res.data);
      } catch (err) {
        console.error(err?.response?.data?.error || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Socket.io listener for real-time updates
  useEffect(() => {
    const updateHandler = (updatedOrder) => {
      setOrderListItem((prev) =>
        prev.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    };

    socket.on("update order", updateHandler);

    return () => {
      socket.off("update order", updateHandler);
    };
  }, []);

  // Delete / cancel order
  const deleteListHandler = async (id) => {
    try {
      await api.patch(`/api/orderlist/updatecancel/${id}`, {
        isCanceled: true,
      });
      notify("Order removed!");

      setOrderListItem((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err?.response?.data?.error || "Failed to remove order");
      notify("Failed to remove order");
    }
  };

  return (
    <FoodOrderContext.Provider
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
    </FoodOrderContext.Provider>
  );
};
