import React, {useEffect} from 'react'
import { Socket, io } from "socket.io-client";


const useSokcet = () => {

    const socket = io(process.env.server_api);
    
  useEffect(() => {
    const socket = io(process.env.server_api);
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