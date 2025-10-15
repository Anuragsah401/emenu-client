import React, { useState, useEffect } from "react";

import { useAxios } from "Hooks/useAxios";

import ContainerLayout from "Components/UI/Admin/ContainerLayout/ContainerLayout";
import DeviceIcon from "Assets/Icons/DeviceIcon";
import LoadingIcon from "Assets/Icons/LoadingIcon";
import {
  BatteryIconLvl4,
  BatteryIconLvl3,
  BatteryIconLvl2,
  BatteryIconLvl1,
} from "Assets/Icons/BatteryIcon";

const Devices = () => {
  const [deviceData, setDeviceData] = useState([]);
  const { response, loading, error } = useAxios({ url: "/api/customer" });

  useEffect(() => {
    if (response !== null) {
      setDeviceData(response);
    }
  }, [response]);

  const batteryIcon = (health) => {
    if (health <= 25) {
      return <BatteryIconLvl1 />;
    } else if (health <= 50) {
      return <BatteryIconLvl2 />;
    } else if (health <= 75) {
      return <BatteryIconLvl3 />;
    } else {
      return <BatteryIconLvl4 />;
    }
  };

  const statusColor = (health) => {
    if (health <= 25) {
      return "#CE0909";
    } else if (health <= 50) {
      return "#797B00";
    } else if (health <= 75) {
      return "#00477B";
    } else {
      return "#027B00";
    }
  };

  const title = "Devices connected";
  const description =
    "See number of devices connected to system and its battery health";

  return (
    <ContainerLayout title={title} description={description}>
      <div className="flex flex-wrap justify-center gap-y-6">
        {loading ? (
          <LoadingIcon />
        ) : deviceData ? (
          deviceData?.map((item, i) => (
            <div key={`device${i}`} className="text-center">
              <div className="relative">
                <DeviceIcon />

                {item.activeStatus === "offline" ? <div className="z-[50] text-[1.8em] text-white font-semibold flex justify-center items-center absolute top-9 bottom-9 left-12 right-12 rounded-xl bg-[#000000af]"> 
                  This Device is offline!
                </div> : null}

                <div className=" absolute top-[7em] left-[27%] z-40 font-semibold">
                  <div className="flex justify-center">
                    {batteryIcon(item.battryPercent)}
                  </div>
                  Battery Health
                  <h5
                    className="text-[1.5em]"
                    style={{ color: statusColor(item.battryPercent) }}
                  >
                    {item.battryPercent.toFixed(0)}%
                  </h5>
                </div>
              </div>

              <h3 className="text-[1.5em] -mt-7 capitalize">{item.username}</h3>
            </div>
          ))
        ) : (
          <h3 className="text-center text-[1.5em] py-[5em]">
            No Devices Found!
          </h3>
        )}
      </div>
    </ContainerLayout>
  );
};

export default Devices;
