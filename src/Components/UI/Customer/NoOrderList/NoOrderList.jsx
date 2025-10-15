import React from "react";
import NoListIcon from "Assets/Icons/NoListIcon";

const NoOrderList = () => {
  return (
    <div className="p-5 flex flex-col justify-center items-center">
      <NoListIcon width="100px" height="100px" />

      <h3 className="text-center font-semibold mt-2">
        <span className="text-[20px]">There is no food items in List</span>
        <br /> <span>Please add items to the list!</span>
      </h3>
    </div>
  );
};

export default NoOrderList;
