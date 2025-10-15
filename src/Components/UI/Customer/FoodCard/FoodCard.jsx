import React, { useState, useEffect } from "react";

import { useFoodCard } from "Context/CustomerContext/FoodCardContext";
import { useFoodOrder } from "Context/CustomerContext/FoodOrderContext";

const FoodCard = (props) => {
  const { foodListItem, setFoodListItem, setMarkPrice } = useFoodCard();
  const { isOrderPlaced } = useFoodOrder();

  const [amount, setAmount] = useState(0);
  const [amountError, setAmountError] = useState("");
  const [isItemFound, setIsItemFound] = useState(false);

  const { _id, img, name, price } = props?.food;

  // finding if food item is added on foodlist or not
  useEffect(() => {
    const foodItem = foodListItem?.find((foodItem) => foodItem?._id === _id);
    const isItemFound = foodListItem.some((list) => list === foodItem);
    setIsItemFound(isItemFound);
  }, [foodListItem, _id]);

  useEffect(() => {
    setAmount(0);
  }, [isOrderPlaced]);

  const increaseAmount = () => {
    setAmount((prev) => prev + 1);
  };

  const decreaseAmount = () => {
    setAmount((prev) => prev - 1);
  };

  // const a = orderListItem.find((item) => item.id === id);
  const addToOrderList = (_id, name, price, img) => {
    if (amount > 0) {
      setFoodListItem((prev) => {
        return [...prev, { _id, name, amount, price: price * amount, img }]; // add item to cart
      });
      setAmount(0);
      setAmountError("");
      setMarkPrice(price);
    } else {
      setAmountError("Please select the amount");
    }
  };

  const style = [
    "px-[0.8rem] border-2 border-black active:bg-[red] active:text-white",
  ];
  return (
    <div className="relative shadow-xl z-10 border-2 rounded-lg ">
      <div className="w-full rounded-lg bg-[#fff] truncate ">
        <div className="w-full h-[200px]">
          <img src={`http://localhost:4000/${img}`} className="w-full h-full object-cover" alt={name} />
        </div>
        <div className="px-[0.5rem] py-[0.3rem] text-black">
          <div className="font-semibold text-[1.8rem] capitalize">{name}</div>

          <div className="flex justify-between">
            <div className="text-[1.3rem]">{`$${price}`}</div>
            <div className="text-[1.5rem] flex">
              <button
                disabled={amount <= 0 ? true : false}
                className={style}
                onClick={decreaseAmount}
              >
                -
              </button>
              <div className={`${style} border-0 active:bg-[#eee]`}>
                {amount}
              </div>
              <button onClick={increaseAmount} className={style}>
                +
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={() => addToOrderList(_id, name, price, img)}
          className="text-center px-[1rem] py-[0.7rem] bg-[#20cfba] active:bg-[red] w-full"
        >
          Add to Order List
        </button>
      </div>

      {amountError ? (
        <p className="text-[#fa4242] text-center absolute -bottom-6 w-full z-50">
          {amountError}
        </p>
      ) : null}

      {isItemFound ? (
        <div className="p-1 font-medium rounded-lg text-white absolute text-center text-[30px] flex justify-center items-center top-0 h-full w-full bg-[#00000086]">
          Item Added to Order List
        </div>
      ) : null}
    </div>
  );
};

export default FoodCard;
