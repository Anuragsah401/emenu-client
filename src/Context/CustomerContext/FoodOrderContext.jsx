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

  // Fetch orders once
  useEffect(() => {
    let isMounted = true; // prevents state update after unmount

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await api.get("/api/orderlist");
        if (isMounted) setOrderListItem(res.data);
      } catch (err) {
        console.error(err?.response?.data?.error || "Failed to fetch orders");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchOrders();

    return () => {
      isMounted = false;
    };
  }, []); // empty array ensures fetch runs only once

  // Setup socket once
  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(process.env.REACT_APP_SERVER_API, { transports: ["websocket"] });
    }

    const socket = socketRef.current;

    const updateHandler = (updatedOrder) => {
      setOrderListItem((prev) => {
        const index = prev.findIndex(o => o._id === updatedOrder._id);
        if (index !== -1 && JSON.stringify(prev[index]) === JSON.stringify(updatedOrder)) {
          return prev; // no change, avoid re-render
        }
        const newList = [...prev];
        if (index !== -1) {
          newList[index] = updatedOrder;
        } else {
          newList.push(updatedOrder);
        }
        return newList;
      });
    };

    socket.on("update order", updateHandler);

    return () => {
      socket.off("update order", updateHandler);
    };
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
