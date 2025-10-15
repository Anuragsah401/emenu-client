import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import ContainerLayout from "Components/UI/Admin/ContainerLayout/ContainerLayout";

import { useAxios } from "Hooks/useAxios";

const CustomerOrUser = () => {
  const tableHeadLabels = ["id", "username", "status", "created At", "action"];
  const [tableData, setTableData] = useState([]);

  const { response, loading, error } = useAxios({ url: "/api/customer" });

  useEffect(() => {
    if (response !== null) {
      setTableData(response);
    }
}, [response]);

  const title = "Customer List";
  const description = "See List of Customer Accounts";

  return (
    <ContainerLayout title={title} description={description}>
      <Outlet context={[tableHeadLabels, tableData, setTableData, loading]} />
    </ContainerLayout>
  );
};

export default CustomerOrUser;
