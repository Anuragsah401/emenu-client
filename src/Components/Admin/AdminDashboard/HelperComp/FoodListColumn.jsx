import React from "react";
import { Draggable } from "react-beautiful-dnd";

import Droppable from "./Droppable";
import SingleFoodListItem from "./SingleFoodListItem";
import LoadingIcon from "Assets/Icons/LoadingIcon";

const FoodListColumn = ({
  foodData,
  droppableId,
  disableDrop,
  showDeleteIcon,
  isLoading,
  deleteListHandler,
}) => {
  if (isLoading) {
    return (
      <div className="mt-7">
        <LoadingIcon />
      </div>
    );
  }

  return (
    <Droppable
      droppableId={droppableId}
      key={droppableId}
      isDropDisabled={disableDrop}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="max-h-[300px] min-h-[300px] grid grid-cols-3 justify-items-center gap-7 p-2 overflow-y-auto"
        >
          {droppableId === "AddedfoodList" && foodData.length === 0 ? (
            <h1 className="w-[200px] -mr-[20em] mt-[6em]">
              No Item found! <br /> Drop foods item here
            </h1>
          ) : null}

          {droppableId === "foodList" && foodData.length === 0 ? (
            <h1 className="w-[300px] -mr-[20em] mt-[6em]">
              No Item Left <br /> You have dragged all the items!
            </h1>
          ) : null}

          {foodData?.map((item, i) => {
            return (
              <Draggable key={i} draggableId={item._id?.toString()} index={i}>
                {(provided) => (
                  <SingleFoodListItem
                    provided={provided}
                    item={item}
                    showDeleteIcon={showDeleteIcon}
                    droppableId={droppableId}
                    foodData={foodData}
                    deleteListHandler={deleteListHandler}
                  />
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default FoodListColumn;
