import React from "react";
import { NavLink } from "react-router-dom";

import Backery from "Assets/Images/Icons/backery.png";
import Beverage from "Assets/Images/Icons/baverage.png";
import Breakfast from "Assets/Images/Icons/breakfast.png";
import Lunch from "Assets/Images/Icons/lunch.png";
import Snack from "Assets/Images/Icons/snacks.png";
import Desert from "Assets/Images/Icons/desert.png";

const FoodCategories = () => {
  const categories = [
    { icon: Backery, name: "Bakery" },
    { icon: Beverage, name: "Beverages" },
    { icon: Breakfast, name: "Breakfast" },
    { icon: Desert, name: "Desserts" },
    { icon: Lunch, name: "Lunch" },
    { icon: Snack, name: "Snacks" },
  ];

  const activeStyle = {
    backgroundColor: "#c75454",
  };

  return (
    <div className="container pb-6 pt-24">
      <div className="flex justify-between items-center w-full">
        {categories.map((category) => (
          <NavLink
            key={category.name}
            to={`${category.name.toLocaleLowerCase()}`}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            className="hover:bg-[#c75454] active:bg-[#c75454] rounded-md shadow-md"
          >
            <div
              key={category.name}
              className="flex flex-col justify-center items-center w-[100px] h-[90px]"
            >
              <div className="w-[45px] h-[45px]">
                <img
                  className="w-full h-full object-fill"
                  src={category.icon}
                  alt={category.name}
                />
              </div>
              <div className="text-black ">{category.name}</div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default FoodCategories;
