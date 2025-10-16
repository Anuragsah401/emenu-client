import React from "react";

import Title from "Components/UI/Title/Title";
import FoodCard from "Components/UI/Customer/FoodCard/FoodCard";
import LoadingIcon from "Assets/Icons/LoadingIcon";

import { useAxios } from "Hooks/useAxios"; // ✅ use custom hook

const FoodContainer = ({ title, category }) => {
  // ✅ useAxios with auto-fetch mode
  const { response: foodItems, loading, error } = useAxios({
    url: "/api/food", // will fetch from baseURL + /api/food
  });

  // filter items based on category
  const filteredFoodItems = foodItems?.filter(item => item?.category === category);

  return (
    <div className="container py-6">
      <div className="text-center">
        <Title text={title} size="1.3rem" />
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <LoadingIcon />
        </div>
      ) : error ? (
        <div className="text-center text-red-600 mt-9 font-semibold">
          {error}
        </div>
      ) : filteredFoodItems?.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-12 lg:gap-6 xl:gap-8 mt-[2rem]">
          {filteredFoodItems.map((food, i) => (
            <FoodCard food={food} key={food._id || i} />
          ))}
        </div>
      ) : (
        <div className="text-center text-[2em] font-semibold mt-9">
          No item found!
        </div>
      )}
    </div>
  );
};

export default FoodContainer;
