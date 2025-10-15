import React, { useState, useEffect } from "react";

import axios from "axios";

import DashboardFoodLayout from "./HelperComp/DashboardFoodLayout";

import { useAdminContext } from "Context/AdminContext/AdminContext";

const RecommendedFood = () => {
  const { recommendedTableData,
    setrecommendedTableData} =
  useAdminContext();
    // const [tableData, setTableData] = useState(null);

    useEffect(() => {
      axios
        .get("/api/recommendedfood")
        .then((res) => {
          setrecommendedTableData(res?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
  
    return (
      <DashboardFoodLayout
        title="Recommended Foods"
        description="List of Recommended Foods"
        tableData={recommendedTableData}
        buttonTitle="Add Recommended Food"
        setTableData={setrecommendedTableData}
        apiUrl="/api/recommendedfood/"
      />
    );
}

export default RecommendedFood