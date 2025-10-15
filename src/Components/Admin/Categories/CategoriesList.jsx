import React from 'react'
import { NavLink } from 'react-router-dom';

import Backery from "Assets/Images/Icons/backery.png";
import Beverage from "Assets/Images/Icons/baverage.png";
import Breakfast from "Assets/Images/Icons/breakfast.png";
import Lunch from "Assets/Images/Icons/lunch.png";
import Snack from "Assets/Images/Icons/snacks.png";
import Desert from "Assets/Images/Icons/desert.png";

const CategoriesList = () => {

    const categories = [
        { icon: Backery, name: "Bakery" },
        { icon: Beverage, name: "Beverages" },
        { icon: Breakfast, name: "Breakfast" },
        { icon: Desert, name: "Desserts" },
        { icon: Lunch, name: "Lunch" },
        { icon: Snack, name: "Snacks" },
      ];

  return (
    <div>
        <h3 className='text-[1.5em] text-center my-6'>Select food categories to see list of food items:</h3>

         <div className="flex justify-between flex-wrap gap-y-10 items-center w-full mt-9 px-[8em]">
        {categories.map((category) => (
          <NavLink
            key={category.name}
            to={`${category.name.toLocaleLowerCase()}`}
            className="hover:scale-[1.1] transition-all duration-[250ms] active:bg-[#c75454] rounded-md border-2 border-black"
          >
            <div
              key={category.name}
              className="flex flex-col justify-center items-center w-[180px] h-[160px]"
            >
              <div className="w-[80px] h-80px]">
                <img
                  className="w-full h-full object-cover"
                  src={category.icon}
                  alt={category.name}
                />
              </div>
              <div className="text-black text-[1.4em]">{category.name}</div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default CategoriesList