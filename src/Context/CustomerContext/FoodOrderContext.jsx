// Context/CustomerContext/FoodOrderContext.js
import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import api from "utils/axiosConfig";
import { notify } from "Components/UI/Toast/Toast";

const FoodOrderContext = createContext();

export function useFoodOrder() {
  return useContext(FoodOrderContext);
}

export const FoodOrderProvider = ({ children }) => {
  const [orderListItem, setOrderListItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const socketRef = useRef(null);
  const hasFetchedOrders = useRef(false); // ✅ Track if we already fetched

  useEffect(() => {
    if (hasFetchedOrders.current) return; // Prevent multiple fetches

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await api.get("/api/orderlist");
        setOrderListItem(res.data);
        hasFetchedOrders.current = true; // ✅ Mark as fetched
      } catch (err) {
        console.error(err?.response?.data?.error || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []); // empty dependency → runs only once

  // Socket connection (stable using useRef)
  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(process.env.REACT_APP_SERVER_API, { transports: ["websocket"] });
    }

    const socket = socketRef.current;

    const updateHandler = (updatedOrder) => {
      setOrderListItem((prev) =>
        prev.map((order) => (order._id === updatedOrder._id ? updatedOrder : order))
      );
    };

    socket.on("update order", updateHandler);

    return () => socket.off("update order", updateHandler);
  }, []);

  const deleteListHandler = async (id) => {
    try {
      await api.patch(`/api/orderlist/updatecancel/${id}`, { isCanceled: true });
      setOrderListItem((prev) => prev.filter((item) => item._id !== id));
      notify("Order removed!");
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
        deleteListHandler,
        loading,
      }}
    >
      {children}
    </FoodOrderContext.Provider>
  );
};
