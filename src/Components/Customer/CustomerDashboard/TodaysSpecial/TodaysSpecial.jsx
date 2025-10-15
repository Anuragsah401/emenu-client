import React from "react";

import Title from "Components/UI/Title/Title";
import FoodCard from "Components/UI/Customer/FoodCard/FoodCard";

import {useAxios} from "Hooks/useAxios";

import LoadingIcon from "Assets/Icons/LoadingIcon";

const TodaysSpecial = () => {

  const { response, loading, error } = useAxios({
    url: "/api/todaysspecial",
  });

  return (
    <div className="container py-6">
      <div className="text-center">
        <Title text="Todays Special!" size="1.3rem" />
      </div>

      {loading ? (
        <LoadingIcon />
      ) : response?.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-12 lg:gap-6 xl:gap-8 mt-[2rem] text-white">
          {response?.map((food, i) => {
            return <FoodCard food={food} key={i} />;
          })}
        </div>
      ) : (
        <div className="mt-9 flex justify-center items-center h-[240px] border-2 border-emerald-700">
          No Items Found!
        </div>
      )}

    </div>
  );
};

export default TodaysSpecial;
