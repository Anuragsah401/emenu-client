import React, { memo } from "react";
import { useFoodCard } from "Context/CustomerContext/FoodCardContext";

const OrderList = ({ openmodal }) => {
  const { orderListItem } = useFoodOrder();

  return (
    <div
      onClick={openmodal}
      className="fixed right-12 bottom-12 px-4 py-4 bg-[#000000e1] rounded cursor-pointer active:bg-[red] z-50"
    >
      <div className="relative">
        <span className="absolute text-xl font-bold -top-4 -right-[0.7rem] tracking-tighter text-[#fff]">
          {foodListItem.length}
        </span>
        <svg width={39} height={39} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M28.96 6.65a.578.578 0 00-.034-.109l-.02-.038a.576.576 0 00-.03-.058V6.42a.571.571 0 00-.163-.146l-.08-.043L15.89 1.02a.58.58 0 00-.83.526v4.633h-4.441a.58.58 0 00-.58.58v28.96a.58.58 0 00.58.579H28.38a.579.579 0 00.58-.58V6.758a.574.574 0 000-.108zM16.218 2.401l9.217 3.776h-9.217V2.402zm11.584 32.737H11.198V7.337h16.604v27.802z"
            fill="#fff"
          />
          <path
            d="M15.028 13.322a4.541 4.541 0 003.893 4.487v2.656H16.99a.58.58 0 000 1.159h5.02a.58.58 0 000-1.159h-1.931v-2.637a4.54 4.54 0 004.024-4.506.579.579 0 00-.58-.58h-7.915a.58.58 0 00-.58.58zm7.87.579a3.379 3.379 0 01-6.657 0h6.657zM13.9 26.45a.58.58 0 00.58.58h10.04a.58.58 0 000-1.159H14.48a.58.58 0 00-.58.58zM22.076 28.96h-5.02a.58.58 0 000 1.159h5.02a.58.58 0 000-1.159z"
            fill="#fff"
          />
        </svg>
      </div>
    </div>
  );
};

export default memo(OrderList);
