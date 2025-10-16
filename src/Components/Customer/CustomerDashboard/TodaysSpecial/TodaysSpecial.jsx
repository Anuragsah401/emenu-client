import React from "react";
import Title from "Components/UI/Title/Title";
import FoodCard from "Components/UI/Customer/FoodCard/FoodCard";
import LoadingIcon from "Assets/Icons/LoadingIcon";

import { useAxios } from "Hooks/useAxios";

const TodaysSpecial = () => {
  const { response: specials, loading, error } = useAxios({
    url: "/api/todaysspecial", // ✅ this will hit baseURL + this path
  });

  return (
    <div className="container py-6">
      <div className="text-center">
        <Title text="Today's Special!" size="1.3rem" />
      </div>

      {loading && (
        <div className="flex justify-center py-8">
          <LoadingIcon />
        </div>
      )}

      {!loading && error && (
        <div className="mt-9 flex justify-center items-center h-[240px] border-2 border-red-500 text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && specials?.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-12 lg:gap-6 xl:gap-8 mt-[2rem] text-white">
          {specials.map((food) => (
            <FoodCard food={food} key={food._id} />
          ))}
        </div>
      )}

      {!loading && !error && (!specials || specials.length === 0) && (
        <div className="mt-9 flex justify-center items-center h-[240px] border-2 border-emerald-700">
          No Items Found!
        </div>
      )}
    </div>
  );
};

export default TodaysSpecial;
