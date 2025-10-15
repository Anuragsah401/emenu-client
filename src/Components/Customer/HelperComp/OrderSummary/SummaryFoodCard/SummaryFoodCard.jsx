import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { useFoodCard } from "Context/CustomerContext/FoodCardContext";

const SummaryFoodCard = ({ foodItem }) => {
  const { _id, name, amount, price, img } = foodItem;
  const {increaseAmount, decreaseAmount, deleteFoodListItem } = useFoodCard();

  const disableDecreaseBtn = amount <= 1

  return (
    <div className="flex justify-between gap-3 md:gap-3 items-center mt-6 pt-6">
      <div className="flex items-center">
        <img src={`http://localhost:4000/${img}`} alt={name} className="rounded w-[60px] h-[60px] object-cover" />

        <div className="ml-3">
          <span className="md:text-md font-medium">{name}</span>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="pr-8 flex items-center">
          <button disabled={disableDecreaseBtn} onClick={()=> decreaseAmount(_id)} className=" text-[1.5rem] font-semibold bg-gray-500 px-3 cursor-pointer text-white active:bg-[red]">
            -
          </button>
          <input
            readOnly
            type="text"
            value={amount}
            className="focus:outline-none bg-gray-100 border h-6 w-9 rounded text-[1rem] px-2 mx-2"
          />
          <button onClick={()=> increaseAmount(_id)} className="text-[1.5rem] font-semibold bg-gray-500 px-3 cursor-pointer text-white active:bg-[red]">
            +
          </button>
        </div>

        <div className="pr-8 ">
          <span className="text-sm font-medium">${price}</span>
        </div>
        <button onClick={() => deleteFoodListItem(_id)}>
          <FontAwesomeIcon className="active:text-[red]" icon={faXmark} size="lg" color="#000" />
        </button>
      </div>
    </div>
  );
};

export default SummaryFoodCard;
