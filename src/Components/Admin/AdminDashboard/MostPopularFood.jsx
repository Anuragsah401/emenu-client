import React, { useEffect } from "react";
import DashboardFoodLayout from "./HelperComp/DashboardFoodLayout";
import { useAdminContext } from "Context/AdminContext/AdminContext";
import { useAxios } from "Hooks/useAxios";

const MostPopularFood = () => {
  const { mostPopularTableData, setMostPopularTableData } = useAdminContext();

  // Fetch data using custom hook
  const { response, loading, error } = useAxios({
    url: "/api/mostpopularfood",
  });

  // Update context when response arrives
  useEffect(() => {
    if (response) {
      setMostPopularTableData(response);
    }
  }, [response, setMostPopularTableData]);

  return (
    <DashboardFoodLayout
      title="Most Popular Foods"
      description="List of most popular foods"
      tableData={mostPopularTableData}
      buttonTitle="Add Most Popular Food"
      setTableData={setMostPopularTableData}
      apiUrl="/api/mostpopularfood/"
      loading={loading}
      error={error}
    />
  );
};

export default MostPopularFood;
