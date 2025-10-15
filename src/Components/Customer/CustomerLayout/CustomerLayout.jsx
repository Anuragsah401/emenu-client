import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import axios from "axios";

// import ScrollDownIcon from "../../UI/ScrollDownIcon/ScrollDownIcon";
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
import {notify} from "Components/UI/Toast/Toast";
import acceptTone from "Assets/tone/acceptorder.mp3"
import cancelTone from "Assets/tone/cancelorder.mp3"

const socket = io('http://localhost:4000');


const CustomerLayout = ({ children }) => {
  const [accept] = useState(new Audio(acceptTone))
  const [cancel] = useState(new Audio(cancelTone))
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [backDrop, setBackDrop] = useState(false);
  const [sideBar, setSideBar] = useState(false);
  const [openCheckoutModal, setOpenCheckoutModal] = useState(false);
  const [orderId, setOrderId] = useState();
  const [paymethod, setPayMethod] = useState("");
  // const [battery, setBattery] = useState({ level: 0, charging: false });

  // const handleBatteryChange = async ({ target: { level, charging } }) => {
  //   //  setBattery({ level, charging });
  //   const isAuthenticated = localStorage.getItem("customer");

  //   const id = JSON.parse(isAuthenticated)?.id;
  //   await axios
  //     .patch(`/api/customer/updatecustomer/${id}`, {
  //       battryPercent: level * 100,
  //     })
  //     .then((response) => {
  //       // console.log(response);
  //     })
  //     .catch((err) => console.log(err.res));
  // };

  // useEffect(() => {
  //   let battery;
  //   navigator.getBattery().then((bat) => {
  //     battery = bat;
  //     battery.addEventListener("levelchange", handleBatteryChange);
  //     battery.addEventListener("chargingchange", handleBatteryChange);
  //     handleBatteryChange({ target: battery });
  //   });
  // }, []);

  // useEffect(() => {
  //   const isAuthenticated = localStorage.getItem("customer");

  //   if (isAuthenticated == null) {
  //     navigate(-1);
  //   }

  //   if (isAuthenticated) {
  //     const id = JSON.parse(isAuthenticated).id;
  //     axios
  //       .patch(`/api/customer/updatecustomer/${id}`, {
  //         activeStatus: "online",
  //       })
  //       .then((response) => {
  //         // console.log(response);
  //       });
  //   }

  //   return () => {
  //     const id = JSON.parse(isAuthenticated).id;
  //     axios
  //       .patch(`/api/customer/updatecustomer/${id}`, {
  //         activeStatus: "offline",
  //         battryPercent: 0,
  //       })
  //       .then((response) => {
  //         // console.log(response);
  //       });
  //   };
  // }, []);

  useEffect(() => {

    socket.on('update order', (updatedOrder) => { 
      if(updatedOrder?.orderStatus === "started") {
        accept.play();
        notify("Your order has been started")
      } else if(updatedOrder?.orderStatus === "canceled") {
        notify("Your order has been canceled")
        cancel.play();
      }else if(updatedOrder?.orderStatus === "completed") {
        notify("Your order has been completed")
      }
    });
  }, []);

  return (
    <div className="bg-[#eee] relative max-h-full min-h-[100vh]">
      <Navbar
        backDrop={backDrop}
        setBackDrop={setBackDrop}
        setSideBar={setSideBar}
      />

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
        <Checkout orderId={orderId} paymethod={paymethod} setPayMethod={setPayMethod}/>
      </Modal>

      <OrderPlaced />

      <Outlet />
    </div>
  );
};

export default CustomerLayout;
