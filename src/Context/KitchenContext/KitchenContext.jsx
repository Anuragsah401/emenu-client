import React, { useContext, useState, createContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useAxios } from "Hooks/useAxios";
import { notify } from "Components/UI/Toast/Toast";
import orderTone from "Assets/tone/notification.mp3";

const KitchenContext = createContext();
export const useKitchenContext = () => useContext(KitchenContext);

export const KitchenContextProvider = ({ children }) => {
  const [orderData, setorderData] = useState([]);
  const [bellTone] = useState(new Audio(orderTone));

  // ⬇ Initial fetch using useAxios
  const { response, loading, fetchData } = useAxios({
    url: "/api/orderlist",
  });

  // 🎧 SOCKET SETUP
  const socketRef = useRef(null);
  useEffect(() => {
    const socketURL = process.env.REACT_APP_SOCKET_URL || "http://localhost:4000";
    const socket = io(socketURL, {
      transports: ["websocket", "polling"],
      withCredentials: true,
    });

    socketRef.current = socket;

    socket.on("new order", (order) => {
      setorderData((prev) => [order, ...prev]);
      bellTone.play();
    });

    socket.on("update order", (updatedOrder) => {
      setorderData((prev) =>
        prev.map((order) => (order._id === updatedOrder._id ? updatedOrder : order))
      );
    });

    return () => socket.disconnect();
  }, [bellTone]);

  // 🔄 Sync with API response
  useEffect(() => {
    if (Array.isArray(response)) setorderData(response);
  }, [response]);

  // 🛠 Helper function to PATCH with useAxios
  const patchOrder = async (orderId, data) => {
    return await fetchData({
      url: `/api/orderlist/updatelist/${orderId}`,
      method: "PATCH",
      body: data,
    });
  };

  // 🍳 Start Order
  const startOrder = async (orderId) => {
    const order = orderData.find((item) => item._id === orderId);
    if (!order) return;

    const updated = { ...order, orderStatus: "started" };
    await patchOrder(orderId, updated);

    notify(`Order from ${updated.tableNo} has been started!`);
  };

  // 🔁 Update Single Food Item
  const updateOrderList = async (orderId, foodId) => {
    const order = orderData.find((item) => item._id === orderId);
    if (!order) return;

    const updatedFood = order.foodList.map((i) =>
      i._id === foodId ? { ...i, completed: !i.completed } : i
    );

    const updated = { ...order, foodList: updatedFood };
    await patchOrder(orderId, updated);

    setorderData((prev) => prev.map((i) => (i._id === orderId ? updated : i)));
  };

  // 🏁 Complete Order
  const changeOrderStatusToComplete = async (orderId) => {
    const order = orderData.find((item) => item._id === orderId);
    if (!order) return;

    if (!order.foodList.every((i) => i.completed)) return;

    const updated = { ...order, orderStatus: "completed" };
    await patchOrder(orderId, updated);

    setorderData((prev) => prev.filter((item) => item._id !== orderId));
    notify(`Order from ${updated.tableNo} completed!`);
  };

  // ❌ Cancel Order
  const cancelOrderHandler = async (orderId) => {
    const order = orderData.find((item) => item._id === orderId);
    if (!order) return;

    const updated = { ...order, orderStatus: "canceled" };
    await patchOrder(orderId, updated);

    setorderData((prev) => prev.filter((item) => item._id !== orderId));
    notify(`Order from ${updated.tableNo} has been canceled!`);
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
