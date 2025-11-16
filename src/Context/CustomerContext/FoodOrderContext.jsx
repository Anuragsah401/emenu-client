import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { io } from "socket.io-client";
import api from "utils/axiosConfig";
import { notify } from "Components/UI/Toast/Toast";

const FoodOrderContext = createContext();
export const useFoodOrder = () => useContext(FoodOrderContext);

export const FoodOrderProvider = ({ children }) => {
  const [orderListItem, setOrderListItem] = useState([]);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    const socketURL =
      process.env.REACT_APP_SOCKET_URL || "http://localhost:4000";

    const socket = io(socketURL, {
      transports: ["websocket", "polling"],
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ FoodOrder socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ FoodOrder socket disconnected");
    });

    socket.on("connect_error", (error) => {
      console.error(
        "⚠️ FoodOrder socket connection error:",
        error?.message || error
      );
    });

    // 🔥 When kitchen updates order status
    socket.on("update order", (updatedOrder) => {
      console.log("📦 Order updated:", updatedOrder);

      setOrderListItem((prev) =>
        prev.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    });

    return () => {
      socket.disconnect();
      console.log("🧹 FoodOrder socket disconnected on cleanup");
    };
  }, []);

  // 🧹 Cleaner helper — prevents duplicates
  const addNewOrder = (newOrder) => {
    setOrderListItem((prev) => {
      const exists = prev.some((order) => order._id === newOrder._id);
      if (exists) return prev; // avoid duplicates

      return [newOrder, ...prev]; // newest at top
    });
  };

  // 🗑 Delete & notify
  const deleteListHandler = async (id) => {
    try {
      await api.patch(`/api/orderlist/updatecancel/${id}`, {
        isCanceled: true,
      });

      setOrderListItem((prev) => prev.filter((item) => item._id !== id));
      notify("Order removed!");
    } catch (err) {
      console.error(
        err?.response?.data?.error || "Failed to remove order"
      );
      notify("Failed to remove order");
    }
  };

  return (
    <FoodOrderContext.Provider
      value={{
        orderListItem,
        setOrderListItem,
        addNewOrder, // 🔥 use this in OrderSummary after POST
        deleteListHandler,
        loading,
        isOrderPlaced, setIsOrderPlaced
      }}
    >
      {children}
    </FoodOrderContext.Provider>
  );
};
