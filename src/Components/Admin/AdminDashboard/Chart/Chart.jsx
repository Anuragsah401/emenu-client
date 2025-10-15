import React, {useState, useEffect} from "react";

import ReactApexChart from "react-apexcharts";
import {useAxios} from "Hooks/useAxios";


const Chart = () => {
  const { response } = useAxios({ url: "/api/orderlist" });

  const [totalRevenue, setTotalRevenue] = useState([]);
  const [totalOrders, setTotalOrders] = useState([]);
  const [orderDates, setOrderDates] = useState([]);

  useEffect(() => {
    if (response) {
      response.forEach((item) => {
        setTotalOrders(prev => [...prev, item.foodList.length])
        setOrderDates(prev => [...prev, item.createdAt])
  
      })

      const totalPriceArray = response.map(order => {
        let totalFoodListPrice = 0;
      
        order.foodList.forEach(item => {
          totalFoodListPrice += item.price * item.amount;
        });
      
        return totalFoodListPrice;
      });

      setTotalRevenue(totalPriceArray)
      
    }
  }, [response]);

  const series = [
    {
      name: "Sales $",
      data: totalRevenue,
    },
    {
      name: "Orders",
      data: totalOrders,
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: orderDates,
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height={330}
      className="bg-[#eee] rounded-lg shadow-md py-3 "
    />
  );
};

export default Chart;
