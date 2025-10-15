import React, {useState} from 'react'

import FoodCompLayout from './HelperComp/FoodCompLayout'

const SnackItems = () => {
    const tableHeadLabels=["ID", "Photo", "Name", "Available", "Price", "Created At", "Action"]
   
  return (
    <FoodCompLayout
    tableHeadLabels={tableHeadLabels}
    title="Snacks"
    placeholder="Search Snacks items..."
    category="snacks"
  />
  )
}

export default SnackItems