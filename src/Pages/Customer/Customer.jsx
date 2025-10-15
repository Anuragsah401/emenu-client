import React, { useState, useEffect } from "react";

import ChooseTable from "Pages/Customer/ChooseTable/ChooseTable";

import { useAxios } from "Hooks/useAxios";

const Customer = () => {
  const { response, loading, error } = useAxios({ url: "/api/customer" });

  const [tableInfo, setTableInfo] = useState([]);

  console.log(tableInfo);

  useEffect(() => {
    if (response !== null) {
      const tableInfo = response?.map((data) => ({tableName: data.username, status: data.activeStatus}));
      setTableInfo(tableInfo);
    }
  }, [response]);


  return (
    <div>
      {/* <ChooseTable tableData={tableInfo} loading={loading} error={error} /> */}
    </div>
  );
};

export default Customer;
