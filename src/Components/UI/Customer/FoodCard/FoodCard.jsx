import React, { useState, useEffect } from "react";
import { useFoodCard } from "Context/CustomerContext/FoodCardContext";
import { useFoodOrder } from "Context/CustomerContext/FoodOrderContext";

const FoodCard = ({ food }) => {
  const { foodListItem, setFoodListItem, setMarkPrice } = useFoodCard();
  const { isOrderPlaced } = useFoodOrder();

  const [amount, setAmount] = useState(0);
  const [amountError, setAmountError] = useState("");
  const [isItemFound, setIsItemFound] = useState(false);
  const [imageError, setImageError] = useState(false);

  const { _id, img, name, price } = food;

  // Check if item is already in the order list
  useEffect(() => {
    const found = foodListItem.some((item) => item._id === _id);
    setIsItemFound(found);
  }, [foodListItem, _id]);

  // Reset amount when a new order is placed
  useEffect(() => {
    setAmount(0);
  }, [isOrderPlaced]);

  const increaseAmount = () => setAmount((prev) => prev + 1);
  const decreaseAmount = () => setAmount((prev) => Math.max(prev - 1, 0));

  const addToOrderList = () => {
    if (amount > 0) {
      setFoodListItem((prev) => [
        ...prev,
        { _id, name, amount, price: price * amount, img },
      ]);
      setAmount(0);
      setAmountError("");
      setMarkPrice(price);
    } else {
      setAmountError("Please select the amount");
    }
  };

  const style = "px-[0.8rem] border-2 border-black active:bg-[red] active:text-white";

  return (
    <div className="relative shadow-xl z-10 border-2 rounded-lg">
      <div className="w-full rounded-lg bg-white truncate">
        <div className="w-full h-[200px]">
          <img
            src={
              imageError
                ? "/placeholder.png" // local fallback image
                : `${process.env.REACT_APP_API_URL}/images/${img}`
            }
            alt={name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        </div>

        <div className="px-[0.5rem] py-[0.3rem] text-black">
          <div className="font-semibold text-[1.8rem] capitalize">{name}</div>

          <div className="flex justify-between">
            <div className="text-[1.3rem]">${price}</div>
            <div className="text-[1.5rem] flex">
              <button
                disabled={amount <= 0}
                className={style}
                onClick={decreaseAmount}
              >
                -
              </button>
              <div className={`${style} border-0 active:bg-[#eee]`}>{amount}</div>
              <button onClick={increaseAmount} className={style}>
                +
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={addToOrderList}
          className="text-center px-[1rem] py-[0.7rem] bg-[#20cfba] active:bg-[red] w-full"
        >
          Add to Order List
        </button>
      </div>

      {amountError && (
        <p className="text-[#fa4242] text-center absolute -bottom-6 w-full z-50">
          {amountError}
        </p>
      )}

      {isItemFound && (
        <div className="p-1 font-medium rounded-lg text-white absolute text-center text-[30px] flex justify-center items-center top-0 h-full w-full bg-[#00000086]">
          Item Added to Order List
        </div>
      )}
    </div>
  );
};

export default FoodCard;
