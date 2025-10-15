import React, { useState, useEffect } from "react";

import axios from "axios";

import DashboardFoodLayout from "./HelperComp/DashboardFoodLayout";

import { useAdminContext } from "Context/AdminContext/AdminContext";

const MostPopularFood = () => {
  const { mostPopularTableData, setMostPopularTableData } = useAdminContext();
  // const [tableData, setTableData] = useState(null);

  useEffect(() => {
    axios
      .get("/api/mostpopularfood")
      .then((res) => {
        setMostPopularTableData(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <DashboardFoodLayout
      title="Most Popular Foods"
      description="List of most Popular Foods"
      tableData={mostPopularTableData}
      buttonTitle="Add Most Popular Food"
      setTableData={setMostPopularTableData}
      apiUrl="/api/mostpopularfood/"
    />
  );
};

export default MostPopularFood;
