import React from "react";

const Backdrop = (props) => {
  return (
    <div
      onClick={props.CloseHandler}
      className="fixed inset-0 z-10 bg-black opacity-50 w-full h-full"
    />
  );
};

export default Backdrop;
