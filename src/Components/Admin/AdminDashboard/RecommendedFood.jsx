import React, { useEffect } from "react";
import DashboardFoodLayout from "./HelperComp/DashboardFoodLayout";
import { useAdminContext } from "Context/AdminContext/AdminContext";
import { useAxios } from "Hooks/useAxios";

const RecommendedFood = () => {
  const { recommendedTableData, setrecommendedTableData } = useAdminContext();

  // Fetch data using useAxios
  const { response, loading, error } = useAxios({
    url: "/api/recommendedfood",
  });

  // Update context when data is received
  useEffect(() => {
    if (response) {
      setrecommendedTableData(response);
    }
  }, [response, setrecommendedTableData]);

  return (
    <DashboardFoodLayout
      title="Recommended Foods"
      description="List of Recommended Foods"
      tableData={recommendedTableData}
      buttonTitle="Add Recommended Food"
      setTableData={setrecommendedTableData}
      apiUrl="/api/recommendedfood/"
      loading={loading}
      error={error}
    />
  );
};

export default RecommendedFood;
