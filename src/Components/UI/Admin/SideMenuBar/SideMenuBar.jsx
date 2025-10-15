import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSignOut } from "react-auth-kit";

import Title from "Components/UI/Title/Title";
import Menu from "./Menu";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Backdrop from "../../Backdrop/Backdrop";

const SideMenuBar = ({ toggleMenu }) => {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const menuItems = [
    {
      title: "Dashboard",
      link: "/admin/dashboard",
    },
    {
      title: "Devices",
      link: "/admin/devices",
    },
    {
      title: "Categories",
      link: "/admin/categories",
    },
    {
      title: "Orders",
      link: "/admin/orders",
    },
    {
      title: "User/Customer",
      link: "/admin/customers",
    },
  ];

  const activeStyle = {
    backgroundColor: "#c75454",
    color: "#FFFFFF",
  };

  const logOutHandler = async () => {
    signOut();
    navigate("/admin/login");
  };

  return (
    <div>
      <aside
        className={`w-[300px] fixed h-full ${
          toggleMenu.toggleSideMenu ? "block" : "hidden"
        }  xl:block z-50 bg-[#bcbcbc]`}
      >
        <div className="border-b border-black px-5 py-2 border-opacity-[29%] flex items-center justify-between">
          <Title text="E-menu" size="2em" />
          <div className="xl:hidden">
            <FontAwesomeIcon
              icon={faCircleXmark}
              size="lg"
              color="#000"
              onClick={() => toggleMenu.setToggleSideMenu(false)}
            />
          </div>
        </div>

        <div className="px-5 py-3 border border-t-0 border-black border-opacity-[29%] h-full">
          <div className="flex my-7 items-center">
            <div className="rounded-full border border-black w-[70px] h-[70px] flex justify-center items-center">
              <div className="text-[2em] font-semibold">CE</div>
            </div>
            <div className="ml-2">
              <h3 className="font-semibold text-[1.5em] text-opacity-0">
                Cafe emil
              </h3>
              <div className="text-[0.8em] -mt-1 text-black text-opacity-50">
                Restaurant Manager
              </div>
            </div>
          </div>

          <div>
            {menuItems.map((item, i) => (
              <NavLink
                key={i}
                className="my-2 inline-block bg-[#D9D9D9] active:bg-[#c75454] rounded-md shadow-md"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                to={item.link}
              >
                <Menu isTransparent={true}>{item.title}</Menu>
              </NavLink>
            ))}
          </div>

          <div onClick={logOutHandler} className="mt-11">
            <Menu>Logout</Menu>
          </div>
        </div>
      </aside>

      {toggleMenu.toggleSideMenu ? (
        <Backdrop CloseHandler={() => toggleMenu.setToggleSideMenu(false)} />
      ) : (
        false
      )}
    </div>
  );
};

export default SideMenuBar;
