import React, {useEffect} from 'react'
import { Socket, io } from "socket.io-client";


const useSokcet = () => {

    const socket = io('http://localhost:4000');
    
  useEffect(() => {
    const socket = io("http://localhost:4000");
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