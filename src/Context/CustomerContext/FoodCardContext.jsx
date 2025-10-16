import React, { createContext, useContext, useState, useMemo, useCallback } from "react";

const FoodCardContext = createContext();

export function useFoodCard() {
  return useContext(FoodCardContext);
}

export const FoodCardProvider = ({ children }) => {
  const [foodListItem, setFoodListItem] = useState([]);
  const [markPrice, setMarkPrice] = useState(0);

  // totalPrice recalculated only when foodListItem changes
  const totalPrice = useMemo(
    () => foodListItem.reduce((sum, foodItem) => sum + foodItem.price, 0),
    [foodListItem]
  );

  const getFoodAmount = useCallback(
    (id) => foodListItem.find((foodItem) => foodItem._id === id)?.amount || 0,
    [foodListItem]
  );

  const increaseAmount = useCallback(
    (id) => {
      setFoodListItem((currentFoodItem) =>
        currentFoodItem.map((foodItem) =>
          foodItem._id === id
            ? {
                ...foodItem,
                amount: (foodItem.amount || 0) + 1,
                price: ((foodItem.amount || 0) + 1) * markPrice,
              }
            : foodItem
        )
      );
    },
    [markPrice]
  );

  const decreaseAmount = useCallback(
    (id) => {
      setFoodListItem((currentFoodItem) =>
        currentFoodItem.map((foodItem) =>
          foodItem._id === id
            ? {
                ...foodItem,
                amount: Math.max((foodItem.amount || 0) - 1, 0),
                price: Math.max((foodItem.amount || 0) - 1, 0) * markPrice,
              }
            : foodItem
        )
      );
    },
    [markPrice]
  );

  const deleteFoodListItem = useCallback(
    (id) => {
      setFoodListItem((currentFoodItem) =>
        currentFoodItem.filter((foodItem) => foodItem._id !== id)
      );
    },
    []
  );

  return (
    <FoodCardContext.Provider
      value={{
        foodListItem,
        setFoodListItem,
        totalPrice,
        deleteFoodListItem,
        increaseAmount,
        decreaseAmount,
        setMarkPrice,
        getFoodAmount,
      }}
    >
      {children}
    </FoodCardContext.Provider>
  );
};
