import { useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import SummaryFoodCard from "./SummaryFoodCard/SummaryFoodCard";
import NoOrderList from "Components/UI/Customer/NoOrderList/NoOrderList";
import { notify } from "Components/UI/Toast/Toast";

import { useFoodCard } from "Context/CustomerContext/FoodCardContext";
import { useFoodOrder } from "Context/CustomerContext/FoodOrderContext";
import { useAxios } from "Hooks/useAxios";

const OrderSummary = (props) => {
  const { tableId } = useParams();
  const { foodListItem, totalPrice, setFoodListItem } = useFoodCard();
  const { setIsOrderPlaced, setOrderListItem } = useFoodOrder();

  const [error, setError] = useState("");

  // ✅ useAxios hook in manual mode
  const { fetchData, loading } = useAxios({ manual: false });

  const foodOrderHandler = async () => {
  try {
    const order = await fetchData({
      url: "/api/orderlist/",
      method: "POST",
      body: {
        foodList: [...foodListItem],
        tableNo: tableId,
        notifications: ["order placed"],
        timer: 120,
      },
    }).then((order) => {
       // order is a SINGLE OBJECT (not array)
       props.closeModal(false);
    setOrderListItem((prev) => [order, ...prev]);

    setIsOrderPlaced(true);
    setFoodListItem([]);
    notify("Order request has been sent!");
}
);}
catch (err) {
    console.error("Order error:", err);
    setError(err?.response?.data?.error || "Failed to place order");
  }
};
  return (
    <div className="md:flex">
      <div className="w-full p-4 px-5 py-5">
        <div className="md:grid md:grid-row-2 gap-2">
          <h1 className="text-xl font-medium underline pt-5 w-full">
            Food order summary!
          </h1>

          {foodListItem?.length > 0 ? (
            <>
              <div className="col-span-2 p-5 pt-0">
                <div className="h-[300px] overflow-y-auto pr-5">
                  {foodListItem?.map((item) => (
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
                      ${totalPrice}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-gray-800 rounded overflow-visible col-span-2">
                <button
                  onClick={foodOrderHandler}
                  disabled={loading}
                  className={`h-12 w-full rounded text-white focus:outline-none transition-all ${
                    loading
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-[#20cfba] active:bg-[red]"
                  }`}
                >
                  {loading ? "Placing Order..." : "-- Order Now --"}
                </button>
                {error && (
                  <p className="text-red-500 text-center mt-2 font-medium">
                    {error}
                  </p>
                )}
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
