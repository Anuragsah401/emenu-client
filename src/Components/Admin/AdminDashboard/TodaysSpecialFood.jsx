import React, { useState, useEffect } from "react";

import axios from "axios";

import DashboardFoodLayout from "./HelperComp/DashboardFoodLayout";

import { useAdminContext } from "Context/AdminContext/AdminContext";

const TodaysSpecialFood = () => {
  const { todaysSpecialTableData, setTodaysSpecialTableData } =
    useAdminContext();
  // const [tableData, setTableData] = useState(null);

  useEffect(() => {
    axios
      .get("/api/todaysspecial")
      .then((res) => {
        setTodaysSpecialTableData(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <DashboardFoodLayout
      title="Todays special Foods"
      description="List of special food"
      tableData={todaysSpecialTableData}
      buttonTitle="Add Special Food"
      setTableData={setTodaysSpecialTableData}
      apiUrl="/api/todaysspecial/"
    />
  );
};

export default TodaysSpecialFood;
