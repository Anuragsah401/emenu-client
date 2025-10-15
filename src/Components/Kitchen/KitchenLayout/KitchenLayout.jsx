import React from "react";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";

import Header from "Components/UI/Kitchen/Header";

const KitchenLayout = () => {
  
  const tabs = ["Orders", "Completed" ,"Canceled" ];

  const activeStyle = {
    borderColor: "#EA4444",
    color: "#EA4444",
  };

  return (
    <div className="">
      <Header />

      <div className="text-center mt-7">
        {tabs.map((tab, i) => {
          return (
            <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            key={i} to={tab.toLowerCase()} className="ml-5 px-3 py-2 border-b border-black font-semibold">
              {tab}
            </NavLink>
          );
        })}
      </div>
      <div className="mt-6 px-3 py-3 min-h-[80vh] w-[95%] mx-auto bg-[#D9D9D9] rounded-md overflow-hidden">
        <Outlet />
      </div>
      
    </div>
  );
};

export default KitchenLayout;
