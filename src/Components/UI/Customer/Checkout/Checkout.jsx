import React, { useState, useEffect } from "react";
import axios from "axios";

import { useFoodOrder } from "Context/CustomerContext/FoodOrderContext";
import { notify } from "../../Toast/Toast";
import PayViaQr from "./PayViaQr";
import PayViaCash from "./PayViaCash";

import payCashImg from "Assets/Images/paycash.jpg";
import payQrImg from "Assets/Images/payqr.jpg";
import { useAxios } from "Hooks/useAxios";
import PaymentDone from "./PaymentDone";

const Checkout = ({ setOpenCheckoutModal, orderId, paymethod, setPayMethod }) => {
  const { orderListItem, setOrderListItem } = useFoodOrder();
  const [orderItemPrice, setOrderItemPrice] = useState();
  

  const { response, loading, error } = useAxios({
    url: orderId && `/api/orderlist/getOneOrderlistItem/${orderId}`,
  });

  useEffect(() => {
    if (response) {
      const totalPrice = response.foodList
        .map((foodItem) => foodItem.price)
        .reduce((a, b) => a + b, 0);
      setOrderItemPrice(totalPrice);
    }
  }, [response]);

  const checkoutHandler = async () => {
    if (orderId) {                            
      const checkingOutOrder = orderListItem.find((item) => item._id === orderId);

      const updated = { ...checkingOutOrder, isCheckout: true };

      if (updated) {
        await axios
          .patch(`/api/orderlist/updatelist/${orderId}`, updated)
          .then((response) => {
            // notify(`Order from ${updated.tableNo} has been canceled!`);
            setPayMethod("done");
          });
      }

      const deleted = orderListItem?.filter((item) => item._id !== orderId);
      setOrderListItem(deleted);
    }
  };

  const btnStyle = "hover:scale-[1.1] transition ease-in-out";

  return (
    <div className="px-[5em] py-[3em]">
      {!paymethod ? (
        <div>
          <h1 className="text-[2.5em] font-semibold mb-10">
            Select Your Payment Method
          </h1>
          <div className="flex justify-center items-center gap-[5em]">
            <button onClick={() => setPayMethod("cash")} className={btnStyle}>
              <img
                src={payCashImg}
                alt="Pay Via Cash"
                className="w-[200px] h-[180px] object-cover border-2 border-black overflow-hidden rounded-md"
              />
              <p className=" font-semibold">Pay Via Cash</p>
            </button>
            <button onClick={() => setPayMethod("qr")} className={btnStyle}>
              <img
                src={payQrImg}
                alt="Pay via QR"
                className="w-[200px] h-[180px] object-cover border-2 border-black overflow-hidden rounded-md"
              />
              <p className=" font-semibold">Pay Via QR Code</p>
            </button>
          </div>
        </div>
      ) : null}

      {paymethod ? (
        <>
          {paymethod === "cash" ? (
            <PayViaCash
              setPayMethod={setPayMethod}
              orderItemPrice={orderItemPrice}
              checkoutHandler={checkoutHandler}
            />
          ) : paymethod === "qr" ? (
            <PayViaQr
              setPayMethod={setPayMethod}
              orderItemPrice={orderItemPrice}
              checkoutHandler={checkoutHandler}
            />
          ) : (
            <PaymentDone />
          )}
        </>
      ) : null}
    </div>
  );
};

export default Checkout;
