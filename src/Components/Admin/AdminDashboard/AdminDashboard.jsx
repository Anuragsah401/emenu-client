import React, { useState, useEffect } from "react";

import Chart from "./Chart/Chart";

import SalesIcon from "Assets/Icons/SalesIcon";
import OrdersIcon from "Assets/Icons/OrdersIcon";

import ContainerLayout from "Components/UI/Admin/ContainerLayout/ContainerLayout";

import TodaysSpecialFood from "./TodaysSpecialFood";
import RecommendedFood from "./RecommendedFood";
import MostPopularFood from "./MostPopularFood";
import AddDashboardFoodModal from "./HelperComp/AddDashboardFoodModal";
import LoadingIcon from "Assets/Icons/LoadingIcon";

import { useAdminContext } from "Context/AdminContext/AdminContext";
import { useAxios } from "Hooks/useAxios";

const AdminDashboard = () => {
  const { modal, setModal } = useAdminContext();
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState()

  const { response, error, loading } = useAxios({ url: "/api/orderlist" });

  useEffect(() => {
    if (response) {
      setTotalOrders(response?.length);

      const filteredData = response?.filter(
        (item) => item?.orderStatus === "completed"
      );

      const orderList = filteredData?.map((items) => items);
      let totalPrice = 0;

      orderList.forEach(order => {
        order.foodList.forEach(item => {
          totalPrice += item.price ;
        });
      });

      setTotalRevenue(totalPrice);

    }
  }, [response]);

  const dashboardCardData = [
    {
      logo: <OrdersIcon />,
      title: "Total Orders",
      value: totalOrders,
    },
    {
      logo: <SalesIcon />,
      title: "Total Sales",
      value: `$${totalRevenue}`,
    },
  ];

  const title = "Sales Chart";
  const description = "See Daily Orders and sales";

  return (
    <>
      <ContainerLayout title={title} description={description}>
        <Chart />

        <div className="flex gap-10 mt-10">
          {dashboardCardData.map((items, i) => (
            <div
              key={i}
              className="p-3 shadow-md bg-[#eee] rounded-lg w-[250px]"
            >
              <div>{items.logo}</div>
              {loading ? (
                <LoadingIcon />
              ) : (
                <>
                  <div className="text-[1.2em] mt-2">{items.title}</div>
                  <h1 className="text-[2em]">{items.value}</h1>
                </>
              )}
            </div>
          ))}
        </div>
      </ContainerLayout>

      <TodaysSpecialFood />
      <RecommendedFood />
      <MostPopularFood />

      <AddDashboardFoodModal setModal={setModal} modal={modal} />
    </>
  );
};

export default AdminDashboard;
