import React, { useEffect } from "react";

const Timer = ({ time, setTime }) => {

  useEffect(() => {
    let timer;

    if (time > 0) {
      timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [time]);


  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  if (time === 0) {
    return null;
  }

  return (
    <div className="py-2 text-center bg-[#837c7c] text-white w-full active:bg-[red]">
      Wait until customer decide: {formatTime(time)}
    </div>
  );
};

export default Timer;
