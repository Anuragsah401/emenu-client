import React, { useContext, useState, createContext, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

import { useAxios } from "Hooks/useAxios";
import { notify } from "Components/UI/Toast/Toast";
import orderTone from "Assets/tone/notification.mp3"

const KitchenContext = createContext();
const useKitchenContext = () => {
  return useContext(KitchenContext);
};

const socket = io('http://localhost:4000');

const KitchenContextProvider = ({ children }) => {
  const [orderData, setorderData] = useState([]);
  const { response, loading, error } = useAxios({ url: "/api/orderlist" });

  const [bellTone] = useState(new Audio(orderTone))

  useEffect(() => {
    if (response !== null) {
      setorderData(response);
    }
  }, [response]);

  useEffect(() => {
    socket.on('new order', (order) => { 
      setorderData((prevOrders) => {
        return [...order, ...prevOrders];
      })
      bellTone.play();
    });
  }, []);

  useEffect(() => {
    socket.on('update order', (updatedOrder) => { 
      setorderData(prev => prev.map((order) => (order._id === updatedOrder._id ? updatedOrder : order)))
    });
  }, []);


  const startOrder = async (orderId) => {
    const list = orderData.find((item) => item._id === orderId);
    const updated = { ...list, orderStatus: "started" };

    if (updated) {
      await axios
        .patch(`/api/orderlist/updatelist/${orderId}`, updated)
        .then((response) => {
          notify(`Order from ${updated.tableNo} has been started!`);
        });
    }
  };

  const updateOrderList = async (orderId, foodId) => {
    const list = orderData.find((item) => item._id === orderId);
    const updatedList = list.foodList.map((item) => {
      if (item._id === foodId) {
        item.completed = !item.completed;
      }
      return item;
    });

    const updated = { ...list, foodList: updatedList };

    if (updated) {
      await axios
        .patch(`/api/orderlist/updatelist/${orderId}`, updated)
        .then((response) => {
         
        });

      //updating orderList state after checking box
      const newState = orderData.map((item) => {
        if (item._id === orderId) {
          return updated;
        }
        return item;
      });

      setorderData(newState);
    }
  };

  const changeOrderStatusToComplete = async (orderId) => {
    const list = orderData.find((item) => item._id === orderId);
    const isFoodItemComplete = list.foodList.every((item) => item.completed);

    if (isFoodItemComplete) {
      const updated = { ...list, orderStatus: "completed" };
      await axios
        .patch(`/api/orderlist/updatelist/${orderId}`, updated)
        .then((response) => {
          const deleted = orderData.filter((item) => item._id !== orderId);
          setorderData(deleted);
          notify(`Order from ${updated.tableNo} completed!`);
        });

      //updating orderList state after order completed
      const newState = orderData.map((item) => {
        if (item._id === orderId) {
          return updated;
        }
        return item;
      });

      setorderData(newState);
    }
  };

  const cancelOrderHandler = async (id) => {
    const canceledOrder = orderData.find((item) => item._id === id);
    const updated = { ...canceledOrder, orderStatus: "canceled" };

    if (updated) {
      await axios
        .patch(`/api/orderlist/updatelist/${id}`, updated)
        .then((response) => {
          notify(`Order from ${updated.tableNo} has been canceled!`);
        });
    }

    const deleted = orderData.filter((item) => item._id !== id);
    setorderData(deleted);
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

export { KitchenContextProvider, useKitchenContext };
