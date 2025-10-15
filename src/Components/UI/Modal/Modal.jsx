import React from "react";

import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
  const modalCloseHandler = () => {
    props.setModal(false);
    props.setPayMethod("")
  };



  return (
    <div
      className={`${
        props.modal ? "block" : "hidden"
      } fixed flex justify-center items-center z-50 top-0 left-0 w-full h-full`}
    >
      {props.modal ? <Backdrop CloseHandler={modalCloseHandler} /> : null}
      <div className="z-10 bg-gray-100 shadow-lg rounded-lg md:min-w-[600px] text-center">{props.children}</div>
    </div>
  );
};

export default Modal;
