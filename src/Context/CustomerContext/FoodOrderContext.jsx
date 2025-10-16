export const FoodOrderProvider = ({ children }) => {
  const [orderListItem, setOrderListItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const socketRef = useRef(null);

  // Fetch orders once
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await api.get("/api/orderlist");
        setOrderListItem(res.data);
      } catch (err) {
        console.error(err?.response?.data?.error || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []); // Only run once

  // Setup socket once
  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(process.env.REACT_APP_SERVER_API, {
        transports: ["websocket"],
      });
    }

    const socket = socketRef.current;

    const updateHandler = (updatedOrder) => {
      setOrderListItem((prev) =>
        prev.map((order) => (order._id === updatedOrder._id ? updatedOrder : order))
      );
    };

    socket.on("update order", updateHandler);

    return () => {
      socket.off("update order", updateHandler);
    };
  }, []);

  // Delete / cancel order
  const deleteListHandler = async (id) => {
    try {
      await api.patch(`/api/orderlist/updatecancel/${id}`, { isCanceled: true });
      setOrderListItem((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err?.response?.data?.error || "Failed to remove order");
    }
  };

  return (
    <FoodOrderContext.Provider
      value={{
        orderListItem,
        setOrderListItem,
        deleteListHandler,
        loading,
      }}
    >
      {children}
    </FoodOrderContext.Provider>
  );
};
