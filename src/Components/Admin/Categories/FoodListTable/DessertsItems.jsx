import React, {useState} from 'react'

import FoodCompLayout from './HelperComp/FoodCompLayout'

const DessertsItems = () => {
    const tableHeadLabels=["ID", "Photo", "Name", "Available", "Price", "Created At", "Action"]
    
  return (
    <FoodCompLayout
    tableHeadLabels={tableHeadLabels}
    title="Dessert"
    placeholder="Search Dessert items..."
    category="desserts"
  />
  )
}

export default DessertsItems