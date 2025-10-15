import React, { useState, useEffect } from "react";

const FoodCard = (props) => {

  const { img, name, price } = props?.food;

  const style = [
    "px-[0.8rem] border-2 border-black active:bg-[red] active:text-white",
  ];
  return (
    <div className="relative shadow-xl z-10 border-2 rounded-lg ">
      <div className="w-full rounded-lg bg-[#fff] truncate ">
        <div className="w-full h-[200px]">
          <img
            src={props.isImageFromApi ? `http://localhost:4000/${img}`: img}
            className="w-full h-full object-cover"
            alt={name}
          />
        </div>
        <div className="px-[0.5rem] py-[0.3rem] text-black">
          <div className="font-semibold text-[1.8rem] capitalize">{name}</div>

          <div className="flex justify-between">
            <div className="text-[1.3rem]">{`$${price}`}</div>
            <div className="text-[1.5rem] flex">
              <button
             
                className={style}
              
              >
                -
              </button>
              <div className={`${style} border-0 active:bg-[#eee]`}>
                0
              </div>
              <button className={style}>
                +
              </button>
            </div>
          </div>
        </div>
        <button
          className="text-center px-[1rem] py-[0.7rem] bg-[#20cfba] active:bg-[red] w-full"
        >
          Add to Order List
        </button>
      </div>

      {props.disable ? (
        <div className="p-1 font-medium rounded-lg text-white absolute text-center text-[30px] flex justify-center items-center top-0 h-full w-full bg-[#00000000]"></div>
      ) : null}
    </div>
  );
};

export default FoodCard;
