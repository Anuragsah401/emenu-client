import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const useSocket = () => {
  const socketRef = useRef(null);

  useEffect(() => {
    // ✅ Use environment variable, fallback for local dev
    const socketURL =
      process.env.REACT_APP_SOCKET_URL || "http://localhost:4000";

    const socket = io(socketURL, {
      transports: ["websocket", "polling"],
      withCredentials: true,
    });

    socketRef.current = socket;

    // ✅ Correct client-side event
    socket.on("connect", () => {
      console.log("✅ Connected to socket server:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from socket server");
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
      console.log("🧹 Socket disconnected (cleanup)");
    };
  }, []);

  return socketRef; // return socket reference so you can use it elsewhere
};

export default useSocket;
