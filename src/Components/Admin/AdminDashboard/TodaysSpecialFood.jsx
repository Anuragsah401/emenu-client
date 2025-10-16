import React, { useEffect } from "react";
import DashboardFoodLayout from "./HelperComp/DashboardFoodLayout";
import { useAdminContext } from "Context/AdminContext/AdminContext";
import { useAxios } from "Hooks/useAxios";

const TodaysSpecialFood = () => {
  const { todaysSpecialTableData, setTodaysSpecialTableData } = useAdminContext();

  // Fetch data using custom hook
  const { response, loading, error } = useAxios({
    url: "/api/todaysspecial", // baseURL from axios config is applied
  });

  // Update context when response arrives
  useEffect(() => {
    if (response) {
      setTodaysSpecialTableData(response);
    }
  }, [response, setTodaysSpecialTableData]);

  return (
    <DashboardFoodLayout
      title="Today's Special Foods"
      description="List of special food"
      tableData={todaysSpecialTableData}
      buttonTitle="Add Special Food"
      setTableData={setTodaysSpecialTableData}
      apiUrl="/api/todaysspecial/"
      loading={loading}
      error={error}
    />
  );
};

export default TodaysSpecialFood;
