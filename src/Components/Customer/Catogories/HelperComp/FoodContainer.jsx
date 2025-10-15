import React from "react";

import Title from "Components/UI/Title/Title";
import FoodCard from "Components/UI/Customer/FoodCard/FoodCard";

import { useAxios } from "Hooks/useAxios";

import LoadingIcon from "Assets/Icons/LoadingIcon";

const FoodContainer = ({ title, category }) => {
  const { response, loading, error } = useAxios({
    url: "/api/food",
  });

  const filteredFoodItems = response?.filter(item => item?.category === category)

  return (
    <div className="container py-6">
      <div className="text-center">
        <Title text={title} size="1.3rem" />
      </div>

      {loading ? (
        <LoadingIcon />
      ) : filteredFoodItems?.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-12 lg:gap-6 xl:gap-8 mt-[2rem] ">
          {filteredFoodItems.map((food, i) => {
            return <FoodCard food={food} key={`food-${i}`} />;
          })}
        </div>
      ) : (
        <div className="text-center text-[2em] font-semibold mt-9">No item found!</div>
      )}
    </div>
  );
};

export default FoodContainer;
