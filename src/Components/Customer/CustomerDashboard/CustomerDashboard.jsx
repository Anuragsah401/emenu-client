import React from "react";

import TodaysSpecial from "./TodaysSpecial/TodaysSpecial";
import MostPopular from "./MostPopular/MostPopular";
import SomeRecommendation from "./SomeRecommendation/SomeRecommendation";

const Dashboard = () => {
  return (
    <div className="container mt-[13em] flex flex-col h-[calc(100vh-15em)] flex-1 overflow-y-auto md:pt-5 bg-[#f9f9f9] rounded-lg shadow-lg p-4">
      <TodaysSpecial />
      <MostPopular />
      <SomeRecommendation />
    </div>
  );
};

export default Dashboard;
