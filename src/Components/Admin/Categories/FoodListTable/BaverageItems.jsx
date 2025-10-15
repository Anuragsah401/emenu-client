import React, {useState} from "react";

import FoodCompLayout from "./HelperComp/FoodCompLayout";

const BaverageItems = () => {
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
      title="Baverage"
      placeholder="Search Baverage items..."
      category="baverages"
    />
  );
};

export default BaverageItems;
