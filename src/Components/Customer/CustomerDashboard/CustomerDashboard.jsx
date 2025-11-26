import React from "react";

import TodaysSpecial from "./TodaysSpecial/TodaysSpecial";
import MostPopular from "./MostPopular/MostPopular";
import SomeRecommendation from "./SomeRecommendation/SomeRecommendation";

const Dashboard = () => {
  return (
    <div className="overflow-y-scroll max-h-[100vh]">
      <TodaysSpecial />
      <MostPopular />
      <SomeRecommendation />
    </div>
  );
};

export default Dashboard;
