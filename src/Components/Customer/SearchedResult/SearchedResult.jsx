import React from "react";
import { useParams } from "react-router-dom";

import Title from "Components/UI/Title/Title";

import { useAxios } from "Hooks/useAxios";
import LoadingIcon from "Assets/Icons/LoadingIcon";
import FoodCard from "Components/UI/Customer/FoodCard/FoodCard";


const SearchedResult = () => {
  const { foodname } = useParams();
  
  const { response, loading, error } = useAxios({
    url: "/api/food",
  });

  const filteredFoodItems = response?.filter((item) => {
    if (foodname === "") {
      return item;
    } else {
      return item.name.toLowerCase().includes(foodname);
    }
  });

  return (
    <div className="container mt-8">
      <div className="text-center">
        <Title text={`Search result for "${foodname}"`} />
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
        <div className="text-center text-[2em] font-semibold mt-[2em]">No item found!</div>
      )}

    </div>
  );
};

export default SearchedResult;
