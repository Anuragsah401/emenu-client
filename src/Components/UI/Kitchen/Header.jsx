import React, {useState, useEffect} from "react";
import { useSignOut } from 'react-auth-kit'
import { useNavigate } from "react-router-dom";

import Title from "../Title/Title";
import BellIcon from "Assets/Icons/BellIcon";

import { useAxios } from "Hooks/useAxios";
import NotificationListKitchen from "./NotificationListKitchen";


const Header = () => {
  const signOut = useSignOut()
  const navigate = useNavigate();

  const logOutHandler = async () => {
    signOut()
    navigate("/kitchen/login");
  };

  const { response, loading, error } = useAxios({ url: "/api/orderlist" })

  const [notificationList, setNotificationList] = useState([]);
  const [toggleNotification, setToggleNotification] = useState(false);

  const toggleNotifications = () => {
    setToggleNotification(!toggleNotification)
  };

  useEffect(() => {
    response?.map((item) => {
        if (item.orderStatus === "started") {
          setNotificationList((prevNotif) => [
            ...prevNotif,
            {notifMsg: `Order started for ${item.tableNo}`, notifDate: new Date(item.createdAt), orderId: item._id}
          ]);
        } else if (item.orderStatus === "canceled") {
          setNotificationList((prevNotif) => [
            ...prevNotif,
            {notifMsg: `Order canceled for ${item.tableNo}`, notifDate: new Date(item.createdAt), orderId: item._id}
          ]);
        } else if (item.orderStatus === "completed") {
          setNotificationList((prevNotif) => [
            ...prevNotif,
            {notifMsg: `Order completed for ${item.tableNo}`, notifDate: new Date(item.createdAt), orderId: item._id}
            
          ]);
        } else if (item.orderStatus === "pending") {
          setNotificationList((prevNotif) => [
            ...prevNotif,
            {notifMsg: `New order from ${item.tableNo}`, notifDate: new Date(item.createdAt), orderId: item._id}
          ]);
        }
      });
    
  }, [response]);


  return (
    <nav className="bg-[#BCBCBC] flex justify-between items-center sticky top-0 z-[12] pt-2 w-full shadow-md px-8">
      <Title text="E-menu" />

      <h1 className="text-[2.5em] font-semibold">Kitchen</h1>

      <div className="flex items-center gap-5">
        <div onClick={toggleNotifications} className="group relative cursor-pointer ">
          <BellIcon className="group-hover:stroke-[red]" />
          <span className="absolute -top-3 -right-4 bg-[#EA4444] w-[25px] h-[25px] text-center rounded-full font-semibold text-white">
          {notificationList.length}
          </span>
        </div>

        <button
        onClick={logOutHandler}
          className="shadow-md group ml-8 flex items-center gap-4 py-2 px-3 font-semibold bg-[#D9D9D9] rounded-sm hover:bg-[#c75454] hover:text-white"
          to="/admin/addfooditem"
        >
          {/* <div><AddIcon className="group-hover:stroke-white" /></div> */}
          Logout
        </button>
      </div>

      {toggleNotification ? <NotificationListKitchen list={notificationList} loading={loading}/> : null}
    </nav>
  );
};

export default Header;
