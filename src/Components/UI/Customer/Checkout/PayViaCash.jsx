import React from "react";

import BackIcon from "Assets/Icons/BackIcon";

const PayViaCash = ({ setPayMethod, orderItemPrice, checkoutHandler }) => {

  return (
    <div className="relative">
      <button
        className="absolute top-3 left-0"
        onClick={() => setPayMethod("")}
      >
        <BackIcon />
      </button>

      <h1 className="text-[2.7em] font-semibold">Pay via cash</h1>
      <div className="mt-5">
        <p className="text-[1.3em]">Your Total Price is: </p>
        <div className="text-[green] font-bold text-[2em]">
          ${orderItemPrice}
        </div>
      </div>

      <button className="px-10 py-2 rounded-md text-white bg-[red] mt-5 hover:scale-[1.1] transition ease-in-out" onClick={checkoutHandler}>
        Done
      </button>
      <p className="mt-4">Please pay your total via cash and click on done button!</p>
    </div>
  );
};

export default PayViaCash;
