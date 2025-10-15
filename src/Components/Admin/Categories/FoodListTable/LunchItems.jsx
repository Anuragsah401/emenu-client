import React, { useState } from "react";

import FoodCompLayout from "./HelperComp/FoodCompLayout";

const LunchItems = () => {
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
      title="Lunch"
      placeholder="Search Lunch items..."
      category="lunch"
    />
  );
};

export default LunchItems;
