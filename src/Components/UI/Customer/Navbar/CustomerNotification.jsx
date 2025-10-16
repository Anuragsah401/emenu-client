import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

import BellIcon from "Assets/Icons/BellIcon";
import NotificationList from "./NotificationList";
import { useAxios } from "Hooks/useAxios";

const CustomerNotification = () => {
  const { tableId } = useParams();
  const [notificationList, setNotificationList] = useState([]);
  const [toggleNotification, setToggleNotification] = useState(false);
  const { response, loading, error } = useAxios({ url: "/api/orderlist" });

  const socketRef = useRef(null);

  // ✅ Establish socket connection safely
  useEffect(() => {
    const socketURL = process.env.REACT_APP_SOCKET_URL || "http://localhost:4000";
    const socket = io(socketURL, {
      transports: ["websocket", "polling"],
      withCredentials: true,
    });

    socketRef.current = socket;

    socket.on("connect", () => console.log("✅ Connected to socket:", socket.id));
    socket.on("disconnect", () => console.log("❌ Disconnected from socket"));

    // ✅ Handle real-time updates
    socket.on("new order", (order) => {
      if (order?.tableNo === tableId) {
        setNotificationList((prev) => [
          {
            notifMsg: "Your order has been placed",
            notifDate: new Date(),
            orderId: order._id,
          },
          ...prev,
        ]);
      }
    });

    socket.on("update order", (updatedOrder) => {
      if (updatedOrder?.tableNo !== tableId) return;

      let notifMsg = "";
      switch (updatedOrder.orderStatus) {
        case "started":
          notifMsg = "Your order has been started";
          break;
        case "canceled":
          notifMsg = "Your order has been canceled";
          break;
        case "completed":
          notifMsg = "Your order has been completed";
          break;
        default:
          return;
      }

      setNotificationList((prev) => [
        {
          notifMsg,
          notifDate: new Date(),
          orderId: updatedOrder._id,
        },
        ...prev,
      ]);
    });

    // ✅ Clean up when component unmounts
    return () => {
      socket.disconnect();
      console.log("🧹 Socket disconnected (CustomerNotification cleanup)");
    };
  }, [tableId]);

  // ✅ Initial data load (existing orders)
  useEffect(() => {
    if (!response || !Array.isArray(response)) return;

    const filteredList = response.filter((item) => item.tableNo === tableId);

    const formatted = filteredList.map((item) => {
      let notifMsg = "";
      switch (item.orderStatus) {
        case "started":
          notifMsg = "Your order has been started";
          break;
        case "canceled":
          notifMsg = "Your order has been canceled";
          break;
        case "completed":
          notifMsg = "Your order has been completed";
          break;
        case "pending":
          notifMsg = "Your order has been placed";
          break;
        default:
          return null;
      }

      return {
        notifMsg,
        notifDate: new Date(item.createdAt),
        orderId: item._id,
      };
    }).filter(Boolean);

    setNotificationList(formatted);
  }, [response, tableId]);

  const toggleNotifications = () => setToggleNotification(!toggleNotification);

  return (
    <div>
      <div className="group relative cursor-pointer" onClick={toggleNotifications}>
        <BellIcon className="group-hover:stroke-[red]" />
        <span className="absolute -top-3 -right-4 bg-[#EA4444] w-[25px] h-[25px] text-center rounded-full font-semibold text-white">
          {notificationList.length}
        </span>
      </div>

      {toggleNotification && (
        <NotificationList list={notificationList} loading={loading} />
      )}
    </div>
  );
};

export default CustomerNotification;
