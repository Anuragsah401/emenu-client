import React, { useContext, useState, createContext, useEffect, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useAxios } from "Hooks/useAxios";
import { notify } from "Components/UI/Toast/Toast";
import orderTone from "Assets/tone/notification.mp3";

const KitchenContext = createContext();
export const useKitchenContext = () => useContext(KitchenContext);

export const KitchenContextProvider = ({ children }) => {
  const [orderData, setorderData] = useState([]);
  const { response, loading, error } = useAxios({ url: "/api/orderlist" });
  const [bellTone] = useState(new Audio(orderTone));

  // ✅ Create socket ref to persist connection
  const socketRef = useRef(null);

  useEffect(() => {
    const socketURL = process.env.REACT_APP_SOCKET_URL || "http://localhost:4000";

    const socket = io(socketURL, {
      transports: ["websocket", "polling"],
      withCredentials: true,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Connected to socket:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from socket");
    });

    // ✅ Handle "new order" event
    socket.on("new order", (order) => {
      console.log("📦 New order received:", order);
      setorderData((prevOrders) => [order, ...prevOrders]);
      bellTone.play();
    });

    // ✅ Handle "update order" event
    socket.on("update order", (updatedOrder) => {
      setorderData((prev) =>
        prev.map((order) => (order._id === updatedOrder._id ? updatedOrder : order))
      );
    });

    // ✅ Cleanup
    return () => {
      socket.disconnect();
      console.log("🧹 Socket disconnected (cleanup)");
    };
  }, [bellTone]);

  // ✅ Sync with API response
  useEffect(() => {
    if (response && Array.isArray(response)) {
      setorderData(response);
    } else if (response) {
      console.warn("Unexpected API response:", response);
      setorderData([]);
    }
  }, [response]);

  // --- API functions ---
  const startOrder = async (orderId) => {
    const list = orderData.find((item) => item._id === orderId);
    if (!list) return;

    const updated = { ...list, orderStatus: "started" };
    await axios.patch(`/api/orderlist/updatelist/${orderId}`, updated);
    notify(`Order from ${updated.tableNo} has been started!`);
  };

  const updateOrderList = async (orderId, foodId) => {
    const list = orderData.find((item) => item._id === orderId);
    if (!list) return;

    const updatedList = list.foodList.map((item) =>
      item._id === foodId ? { ...item, completed: !item.completed } : item
    );

    const updated = { ...list, foodList: updatedList };
    await axios.patch(`/api/orderlist/updatelist/${orderId}`, updated);

    setorderData((prev) =>
      prev.map((item) => (item._id === orderId ? updated : item))
    );
  };

  const changeOrderStatusToComplete = async (orderId) => {
    const list = orderData.find((item) => item._id === orderId);
    if (!list) return;

    const isFoodItemComplete = list.foodList.every((item) => item.completed);
    if (!isFoodItemComplete) return;

    const updated = { ...list, orderStatus: "completed" };
    await axios.patch(`/api/orderlist/updatelist/${orderId}`, updated);

    setorderData((prev) => prev.filter((item) => item._id !== orderId));
    notify(`Order from ${updated.tableNo} completed!`);
  };

  const cancelOrderHandler = async (id) => {
    const canceledOrder = orderData.find((item) => item._id === id);
    if (!canceledOrder) return;

    const updated = { ...canceledOrder, orderStatus: "canceled" };
    await axios.patch(`/api/orderlist/updatelist/${id}`, updated);
    notify(`Order from ${updated.tableNo} has been canceled!`);

    setorderData((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <KitchenContext.Provider
      value={{
        orderData,
        setorderData,
        cancelOrderHandler,
        loading,
        updateOrderList,
        startOrder,
        changeOrderStatusToComplete,
      }}
    >
      {children}
    </KitchenContext.Provider>
  );
};
