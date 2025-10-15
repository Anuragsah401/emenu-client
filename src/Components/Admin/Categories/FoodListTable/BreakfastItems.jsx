import React, {useState} from "react";

import FoodCompLayout from "./HelperComp/FoodCompLayout";

const BreakfastItems = () => {
  const tableHeadLabels = [
    "ID",
    "Photo",
    "Name",
    "Available",
    "Price",
    "Created At",
    "Action",
  ];

  

  return (
    <FoodCompLayout
    tableHeadLabels={tableHeadLabels}
    title="Breakfast"
    placeholder="Search Breakfast items..."
    category="breakfast"
  />
  );
};

export default BreakfastItems;
