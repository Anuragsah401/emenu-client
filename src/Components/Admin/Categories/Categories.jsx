import React from 'react'
import { Outlet } from "react-router-dom";

import ContainerLayout from 'Components/UI/Admin/ContainerLayout/ContainerLayout'


const Categories = () => {

    const title = "Food Categories";
    const description =
      "Find food categories and list of foods belongs to it.";
  
  return (
    <ContainerLayout title={title} description={description}>
        <Outlet />
    </ContainerLayout>
  )
}

export default Categories