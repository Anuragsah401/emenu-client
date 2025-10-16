import React, { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "Components/UI/Customer/Navbar/Navbar";
import OrderList from "Components/UI/Customer/OrderList/OrderList";
import Modal from "Components/UI/Modal/Modal";
import SideBar from "Components/UI/Customer/SideBar/SideBar";
import OrderPlaced from "Components/UI/Customer/OrderPlaced/OrderPlaced";

import OrderHistory from "../HelperComp/OrderHistory/OrderHistory";
import FoodCategories from "../HelperComp/FoodCategories/FoodCategories";
import OrderSummary from "../HelperComp/OrderSummary/OrderSummary";
import LogoutModal from "../HelperComp/LogoutModal/LogoutModal";
import Checkout from "../../UI/Customer/Checkout/Checkout";

import { io } from "socket.io-client";
import { notify } from "Components/UI/Toast/Toast";
import acceptTone from "Assets/tone/acceptorder.mp3";
import cancelTone from "Assets/tone/cancelorder.mp3";

const CustomerLayout = ({ children }) => {
  const [accept] = useState(new Audio(acceptTone));
  const [cancel] = useState(new Audio(cancelTone));
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [backDrop, setBackDrop] = useState(false);
  const [sideBar, setSideBar] = useState(false);
  const [openCheckoutModal, setOpenCheckoutModal] = useState(false);
  const [orderId, setOrderId] = useState();
  const [paymethod, setPayMethod] = useState("");

  // ✅ Socket ref
  const socketRef = useRef(null);

  useEffect(() => {
    // ✅ Use environment variable in production
    const socketURL = process.env.REACT_APP_SOCKET_URL || "http://localhost:4000";
    const socket = io(socketURL, {
      transports: ["websocket", "polling"],
      withCredentials: true,
    });

    socketRef.current = socket;

    // ✅ Listen for order updates
    const handleUpdateOrder = (updatedOrder) => {
      if (!updatedOrder) return;

      switch (updatedOrder.orderStatus) {
        case "started":
          accept.play();
          notify("Your order has been started");
          break;
        case "canceled":
          cancel.play();
          notify("Your order has been canceled");
          break;
        case "completed":
          notify("Your order has been completed");
          break;
        default:
          break;
      }
    };

    socket.on("update order", handleUpdateOrder);

    // ✅ Cleanup on unmount
    return () => {
      socket.off("update order", handleUpdateOrder);
      socket.disconnect();
      console.log("🧹 CustomerLayout socket disconnected");
    };
  }, [accept, cancel]);

  return (
    <div className="bg-[#eee] relative max-h-full min-h-[100vh]">
      <Navbar backDrop={backDrop} setBackDrop={setBackDrop} setSideBar={setSideBar} />

      <SideBar
        backDrop={backDrop}
        sideBar={sideBar}
        setBackDrop={setBackDrop}
        setSideBar={setSideBar}
        setOpenLogoutModal={setOpenLogoutModal}
      >
        <OrderHistory
          setOpenCheckoutModal={setOpenCheckoutModal}
          setOpenLogoutModal={setOpenLogoutModal}
          setBackDrop={setBackDrop}
          setSideBar={setSideBar}
          setOrderId={setOrderId}
        />
      </SideBar>

      <FoodCategories />
      <OrderList openmodal={setModal} />

      <Modal setModal={setModal} modal={modal}>
        <OrderSummary closeModal={setModal} />
      </Modal>

      <Modal setModal={setOpenLogoutModal} modal={openLogoutModal}>
        <LogoutModal />
      </Modal>

      <Modal setModal={setOpenCheckoutModal} modal={openCheckoutModal} setPayMethod={setPayMethod}>
        <Checkout orderId={orderId} paymethod={paymethod} setPayMethod={setPayMethod} />
      </Modal>

      <OrderPlaced />
      <Outlet />
    </div>
  );
};

export default CustomerLayout;
