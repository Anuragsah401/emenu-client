import React from "react";

import QrImage from "Assets/Images/qr.jpg";
import BackIcon from "Assets/Icons/BackIcon";

const PayViaQr = ({ setPayMethod, orderItemPrice, checkoutHandler }) => {


  return (
    <div className="relative text-center">
      <button
        className="absolute top-3 left-0"
        onClick={() => setPayMethod("")}
      >
        <BackIcon />
      </button>

      <h1 className="text-[2.7em] font-semibold">Scan and Pay!</h1>
      <div className="flex justify-center mt-7">
        <img
          src={QrImage}
          alt="qr code"
          className="w-[200px] h-[250px] object-cover"
        />
      </div>
      <div className="mt-5">
        <p className="text-[1.3em]">Your Total Price is: </p>
        <div className="text-[green] font-bold text-[2em]">
          ${orderItemPrice}
        </div>
      </div>

      <button
        className="px-10 py-2 rounded-md text-white bg-[red] mt-5 hover:scale-[1.1] transition ease-in-out"
        onClick={checkoutHandler}
      >
        Done
      </button>
      <p className="mt-4">
        Please pay your total by scanning above QR code and <br />after payment completes click on done button!
      </p>
    </div>
  );
};

export default PayViaQr;
