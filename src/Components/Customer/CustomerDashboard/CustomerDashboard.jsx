import React from "react";

import TodaysSpecial from "./TodaysSpecial/TodaysSpecial";
import MostPopular from "./MostPopular/MostPopular";
import SomeRecommendation from "./SomeRecommendation/SomeRecommendation";

const Dashboard = () => {
  return (
    <>
      <TodaysSpecial />
      <MostPopular />
      <SomeRecommendation />
    </>
  );
};

export default Dashboard;
