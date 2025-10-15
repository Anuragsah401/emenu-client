import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import BellIcon from "Assets/Icons/BellIcon";
import NotificationList from "./NotificationList";
import { useAxios } from "Hooks/useAxios";

import { io } from "socket.io-client";

const socket = io('http://localhost:4000');


const CustomerNotification = () => {
  const { tableId } = useParams();
  // const { notificationList } = useFoodOrder();

  const [notificationList, setNotificationList] = useState([]);

  console.log(notificationList);
  const [toggleNotification, setToggleNotification] = useState(false);

  const { response, loading, error } = useAxios({ url: "/api/orderlist" });

  useEffect(() => {
    const filtetedList = response?.filter((item) => item.tableNo === tableId);
      filtetedList?.map((item) => {
        if (item.orderStatus === "started") {
          setNotificationList((prevNotif) => [
            ...prevNotif,
            {notifMsg: "Your Order has been started", notifDate: new Date(item.createdAt), orderId: item._id}
          ]);
        } else if (item.orderStatus === "canceled") {
          setNotificationList((prevNotif) => [
            ...prevNotif,
            {notifMsg: "Your Order has been canceled", notifDate: new Date(item.createdAt), orderId: item._id}
          ]);
        } else if (item.orderStatus === "completed") {
          setNotificationList((prevNotif) => [
            ...prevNotif,
            {notifMsg: "Your Order has been completed", notifDate: new Date(item.createdAt), orderId: item._id}
            
          ]);
        } else if (item.orderStatus === "pending") {
          setNotificationList((prevNotif) => [
            ...prevNotif,
            {notifMsg: "Your Order has been placed", notifDate: new Date(item.createdAt), orderId: item._id}
          ]);
        }
      });
    
  }, [response, tableId]);

  const toggleNotifications = () => {
    setToggleNotification(!toggleNotification)
  };

  // useEffect(() => {
  //   socket.on('new order', (order) => { 
  //     console.log(order);
  //     setNotificationList((prevOrders) => {
  //       return [{notifMsg: "Your Order has been placed", notifDate: new Date(), orderId: order?._id}, ...prevOrders];
  //     })
  //     // bellTone.play();
  //   });
  // }, []);

  useEffect(() => {
    socket.on('update order', (updatedOrder) => { 
      setNotificationList(prev => prev.map((order) => (order._id === updatedOrder._id ? updatedOrder : order)))
    });
  }, []);

  return (
    <div>
      <div
        className="group relative cursor-pointer"
        onClick={toggleNotifications}
      >
        <BellIcon className="group-hover:stroke-[red]" />
        <span className="absolute -top-3 -right-4 bg-[#EA4444] w-[25px] h-[25px] text-center rounded-full font-semibold text-white">
          {notificationList.length}
        </span>
      </div>

      {toggleNotification ? <NotificationList list={notificationList} loading={loading}/> : null}
    </div>
  );
};

export default CustomerNotification;
