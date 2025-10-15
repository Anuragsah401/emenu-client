import React from "react";

import Modal from "../../Modal/Modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";

import { useFoodOrder } from "Context/CustomerContext/FoodOrderContext";

const OrderPlaced = () => {
  const { setIsOrderPlaced, isOrderPlaced } = useFoodOrder();

  return (
    <div>
      <Modal setModal={setIsOrderPlaced} modal={isOrderPlaced}>
        <div className=" p-5">
          <h2 className="text-[30px] font-extrabold">
            Thank you for ordering!
          </h2>
          <h3 className="text-[20px] font-bold">Your order has been placed</h3>

          <img
            className="w-56 h-56 mx-auto"
            src="https://www.kindpng.com/picc/m/195-1953240_complete-order-place-shopping-success-tick-icon-order.png"
            alt="Complete, Order, Place, Shopping, Success,"
          />

          <p className="mt-4 font-semibold">
            please make sure to check your order history before checkout <br />{" "}
            as pointed by arrow icon top right cornor.
          </p>
        </div>

        <div className="absolute top-16 right-[1.2%] animate-bounce">
          <FontAwesomeIcon
            icon={faArrowCircleUp}
            color="#eee"
            className="text-[2em]"
          />
        </div>
     
      </Modal>
    </div>
  );
};

export default OrderPlaced;
