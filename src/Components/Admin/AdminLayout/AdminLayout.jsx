import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import SideMenuBar from "Components/UI/Admin/SideMenuBar/SideMenuBar";
import Header from "Components/UI/Admin/Header/Header";


const AdminLayout = () => {
  const [toggleSideMenu, setToggleSideMenu] = useState(false);


//   let batteryPromise = navigator.getBattery();
// batteryPromise.then(batteryCallback);

// function batteryCallback(batteryObject) {
//    printBatteryStatus(batteryObject);
// }
// function printBatteryStatus(batteryObject) {
//     console.log("IsCharging", batteryObject.charging);
//     console.log("Percentage", batteryObject.level);
   
//     console.log("charging Time", batteryObject.chargingTime);
//     console.log("DisCharging Time", batteryObject.dischargingTime);
// }

  return (
    <div className="flex">
      <SideMenuBar toggleMenu={{ setToggleSideMenu, toggleSideMenu }} />

      <div className="flex-1 xl:ml-[300px]">
        <Header openMenuBar={setToggleSideMenu} />
        <Outlet />
      </div>

    </div>
  );
};

export default AdminLayout;
