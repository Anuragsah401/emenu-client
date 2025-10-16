import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import BellIcon from "Assets/Icons/BellIcon";
import AddIcon from "Assets/Icons/AddIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useAxios } from "Hooks/useAxios";

import NotificationListAdmin from "./NotificationListAdmin";



const Header = ({ openMenuBar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchedText, setSearchedText] = useState();

  let PageTitle;

  switch (location.pathname) {
    case "/admin/dashboard":
      PageTitle = "Overview";
      break;
    case "/admin/devices":
      PageTitle = "Devices";
      break;
    case "/admin/categories":
      PageTitle = "Categories";
      break;
    case "/admin/orders":
      PageTitle = "Orders";
      break;
    case "/admin/customers":
      PageTitle = "Users";
      break;
    case "/admin/addfooditem":
      PageTitle = "Add Item";
      break;
    default:
      PageTitle = location.pathname.split('/').pop();;
  }

  const activeStyle = {
    backgroundColor: "#c75454",
    color: "#FFFFFF",
  };

  const onSearchHandler = (e) => {
    e.preventDefault();
    if (searchedText) {
      navigate(`searchfood/${searchedText}`);
    }
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
            {notifMsg: `Order has been started for ${item.tableNo}`, notifDate: new Date(item.createdAt), orderId: item._id}
          ]);
        } else if (item.orderStatus === "canceled") {
          setNotificationList((prevNotif) => [
            ...prevNotif,
            {notifMsg: `Order has been canceled for ${item.tableNo}`, notifDate: new Date(item.createdAt), orderId: item._id}
          ]);
        } else if (item.orderStatus === "completed") {
          setNotificationList((prevNotif) => [
            ...prevNotif,
            {notifMsg: `Order has been completed for ${item.tableNo}`, notifDate: new Date(item.createdAt), orderId: item._id}
            
          ]);
        } else if (item.orderStatus === "pending") {
          setNotificationList((prevNotif) => [
            ...prevNotif,
            {notifMsg: `Order has been placed for ${item.tableNo}`, notifDate: new Date(item.createdAt), orderId: item._id}
          ]);
        }
      });
    
  }, [response]);

  return (
    <div className="sticky top-0 z-[12] flex items-center bg-[#bcbcbc] justify-between border-b border-black border-opacity-[29%] px-5 py-2">
      <div
        onClick={() => openMenuBar(true)}
        className="mr-7 xl:hidden py-[0.1rem] px-[0.3rem] text-center cursor-pointer"
      >
        <FontAwesomeIcon icon={faBars} size="lg" color="#000" />
      </div>

      <h2 className="mr-5 text-[2em] capitalize md:text-[1.5em] font-semibold" >{PageTitle}</h2>

      <form action="" className="flex justify-between" onSubmit={onSearchHandler}>
        <input
        onChange={(e) => setSearchedText(e.target.value)}
          type="text"
          placeholder="search food items..."
          className="flex-1 py-[0.5rem] px-5 w-[38%] rounded-l-lg outline-none bg-slate-800 text-white placeholder-[#aaa7a7]"
        />

        <button type="submit" className="py-[0.5rem] px-5 text-white bg-[#c75454] hover:bg-black rounded-r-lg">Search</button>
      </form>

      <div className="flex items-center ml-10">
        <div onClick={toggleNotifications} className="group relative cursor-pointer ">
          <BellIcon className="group-hover:stroke-[red]" />
          <span className="absolute -top-3 -right-4 bg-[#EA4444] w-[25px] h-[25px] text-center rounded-full font-semibold text-white">
          {notificationList.length}
          </span>
        </div>

        <NavLink
          className="shadow-md group ml-8 flex items-center gap-4 p-3 font-semibold bg-[#D9D9D9] rounded-lg hover:bg-[#c75454] hover:text-white"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          to="/admin/addfooditem"
        >
          <div>
            <AddIcon className="group-hover:stroke-white" />
          </div>
          Add Food Items
        </NavLink>

        {toggleNotification ? <NotificationListAdmin list={notificationList} loading={loading}/> : null}
      </div>
    </div>
  );
};

export default Header;
