// Context/CustomerContext/FoodOrderContext.js
import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import api from "utils/axiosConfig";
import { notify } from "Components/UI/Toast/Toast";

const FoodOrderContext = createContext();
export const useFoodOrder = () => useContext(FoodOrderContext);

export const FoodOrderProvider = ({ children }) => {
  const [orderListItem, setOrderListItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    const socketURL = process.env.REACT_APP_SOCKET_URL || "http://localhost:4000";

    // ✅ Create socket connection (same config as KitchenContext)
    const socket = io(socketURL, {
      transports: ["websocket", "polling"],
      withCredentials: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ FoodOrder socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ FoodOrder socket disconnected");
    });

    socket.on("connect_error", (error) => {
      console.error("⚠️ FoodOrder socket connection error:", error.message);
    });

    // ✅ Handle order update
    socket.on("update order", (updatedOrder) => {
      console.log("📦 Order updated:", updatedOrder);
      setOrderListItem((prev) =>
        prev.map((order) => (order._id === updatedOrder._id ? updatedOrder : order))
      );
    });

    // ✅ Cleanup on unmount
    return () => {
      socket.disconnect();
      console.log("🧹 FoodOrder socket disconnected (cleanup)");
    };
  }, []);

  // ✅ Optional: Fetch initial orders from API (if needed)
  /*
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await api.get("/api/orderlist/customerorders");
        if (Array.isArray(res.data)) {
          setOrderListItem(res.data);
        }
      } catch (error) {
        console.error("❌ Failed to fetch customer orders:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);
  */

  // ✅ Delete handler
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
