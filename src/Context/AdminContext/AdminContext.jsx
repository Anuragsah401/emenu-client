import React, { useContext, useState, createContext } from "react";

const AdminContext = createContext();

const useAdminContext = () => {
  return useContext(AdminContext);
};

const AdminContextProvider = ({ children }) => {
  const [modal, setModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [addedFoodData, setAddedFoodData] = useState([]);
  const [todaysSpecialTableData, setTodaysSpecialTableData] = useState([]);
  const [mostPopularTableData, setMostPopularTableData] = useState([]);
  const [recommendedTableData, setrecommendedTableData] = useState([]);

  return (
    <AdminContext.Provider
      value={{
        modal,
        setModal,
        modalTitle,
        setModalTitle,
        addedFoodData,
        setAddedFoodData,
        todaysSpecialTableData,
        setTodaysSpecialTableData,
        mostPopularTableData,
        setMostPopularTableData,
        recommendedTableData,
        setrecommendedTableData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export { AdminContextProvider, useAdminContext };
