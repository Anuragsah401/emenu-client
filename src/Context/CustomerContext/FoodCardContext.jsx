import React, { useContext, useState } from "react";

const foodCardContext = React.createContext();

export function useFoodCard() {
  return useContext(foodCardContext);
}

export const FoodCardProvider = ({ children }) => {
  const [foodListItem, setFoodListItem] = useState([]);
  const [markPrice, setMarkPrice] = useState(0);

  const totalPrice = foodListItem
    .map((foodItem) => foodItem.price)
    .reduce((a, b) => a + b, 0);


  const getFoodAmount = (id) => {
    return foodListItem.find((foodItem) => foodItem._id === id)?.amount;
  };

  const increaseAmount = (id) => {
    const price = (getFoodAmount(id) + 1) * markPrice

    setFoodListItem((currentFoodItem) => {
      return currentFoodItem?.map((foodItem) => {
        if (foodItem._id === id) {
          return { ...foodItem, amount: foodItem.amount + 1, price: price };
        }
        return foodItem;
      })
    });
  };

  const decreaseAmount = (id) => {
    const price = (getFoodAmount(id) - 1) * markPrice

    setFoodListItem((currentFoodItem) => {
      return currentFoodItem.map((foodItem) => {
        if (foodItem._id === id) {
          return { ...foodItem, amount: foodItem.amount - 1, price: price };
        } else {
          return foodItem;
        }
      })

    });
  };

  const deleteFoodListItem = (id, i) => {
    const deleted = foodListItem.filter((foodItem) => foodItem._id !== id);
    setFoodListItem(deleted);
  };

  return (
    <foodCardContext.Provider
      value={{
        foodListItem,
        setFoodListItem,
        totalPrice,
        deleteFoodListItem,
        increaseAmount,
        decreaseAmount,
        setMarkPrice,
      }}
    >
      {children}
    </foodCardContext.Provider>
  );
};
