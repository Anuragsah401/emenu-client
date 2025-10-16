import React, {useEffect} from 'react'
import { Socket, io } from "socket.io-client";


const useSokcet = () => {

  
    
  useEffect(() => {
    const socket = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:4000");

    console.log("emitting");

    socket.on("connection", (data) => {
      console.log(data);
    })
    

  }, [])

  return (
    <div>useSokcet</div>
  )
}

export default useSokcet