import { useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

// import { notify, Toast } from "Components/UI/Toast/Toast";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import SummaryFoodCard from "./SummaryFoodCard/SummaryFoodCard";

import { useFoodCard } from "Context/CustomerContext/FoodCardContext";
import { useFoodOrder } from "Context/CustomerContext/FoodOrderContext";

import NoOrderList from "Components/UI/Customer/NoOrderList/NoOrderList";
import { notify } from "Components/UI/Toast/Toast";

const OrderSummary = (props) => {
  const { tableId } = useParams();
  const { foodListItem, totalPrice, setFoodListItem } = useFoodCard();
  const { setIsOrderPlaced, setOrderListItem } =
    useFoodOrder();

  const [error, setError] = useState("");

  const foodOrderHandler = async () => {

      await axios
        .post("/api/orderlist/", {
          foodList: [...foodListItem],
          tableNo: tableId,
          notifications: ["order placed"],
          timer: 120
        })
        .then((res) => {
          setOrderListItem(prev => [...res.data, ...prev])
          props.closeModal(false);
          setIsOrderPlaced(true);
          setFoodListItem([]);
          notify(`Order request has been sent!`);
        })
        .catch((error) => setError(error.response.data.error));
    
  };

  return (
    <div className="md:flex ">
      <div className="w-full p-4 px-5 py-5">
        <div className="md:grid md:grid-row-2 gap-2 ">
          <h1 className="text-xl font-medium underline pt-5 w-full">
            Food order summary!
          </h1>

          {foodListItem.length > 0 ? (
            <>
              <div className="col-span-2 p-5 pt-0">
                <div className="h-[300px] overflow-y-auto pr-5">
                  {foodListItem.map((item) => (
                    <SummaryFoodCard key={item?._id} foodItem={item} />
                  ))}
                </div>

                <div className="flex justify-between items-center mt-6 pt-6 border-t">
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faArrowLeft}
                      size="lg"
                      color="#000"
                      className="pr-3"
                    />
                    <span
                      onClick={() => props.closeModal(false)}
                      className="text-md cursor-pointer active:text-[red] font-medium text-pink-500 underline decoration-pink-500"
                    >
                      Continue Selecting
                    </span>
                  </div>

                  <div className="flex justify-center items-center ">
                    <span className="text-sm font-medium text-gray-400 mr-1">
                      Subtotal:
                    </span>
                    <span className="text-lg font-bold text-gray-800 pr-8">
                      {" "}
                      ${totalPrice}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-5 bg-gray-800 rounded overflow-visible col-span-2">
                <button
                  onClick={foodOrderHandler}
                  className="h-12 w-full bg-[#20cfba] rounded focus:outline-none text-white active:bg-[red]"
                >
                  -- Order Now --
                </button>
              </div>
            </>
          ) : (
            <NoOrderList />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
