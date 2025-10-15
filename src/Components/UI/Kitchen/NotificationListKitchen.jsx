import React from "react";
import LoadingIcon from "Assets/Icons/LoadingIcon";

const NotificationListKitchen = ({list, loading}) => {
    const getTime = (orderDate) => {
        let time = orderDate.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
    
        let day = orderDate.toLocaleDateString("en-US", { weekday: "long" });
    
        return `${day} - ${time}`;
      };
    
      return (
        <div className="absolute w-[300px] max-h-[400px] overflow-y-auto top-[4.3em] right-0 bg-[#20cfbbd5] font-semibold rounded-sm border-2 border-black">
          {loading ? (
            LoadingIcon
          ) : list.length !== 0 ? (
            list.map((item, i) => (
              <div key={i} className="p-3  border-black border-b-2">
                <p className="mb-2">{item.notifMsg}</p>
                <div className="flex justify-between text-[0.8em]">
                  <div>Order Id: #{item.orderId.slice(-3)}</div>
                  <div>{getTime(item.notifDate)}</div>
                </div>
              </div>
            ))
          ) : (
            <p className="py-3">No notifications</p>
          )}
        </div>
      );
  
}

export default NotificationListKitchen