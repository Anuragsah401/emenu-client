import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const SideBar = (props) => {
 

  const logoutHandler = () => {
    props.setBackDrop(false);
    props.setSideBar(false);
    props.setOpenLogoutModal(true)
  };

  return (
    <div
      className={`${
        !props.sideBar ? "hidden" : ""
      } fixed top-0 right-0 w-[20rem] h-full bg-[#eee] z-[99] flex flex-col justify-between`}
    >
      <div className="h-full">{props.children} </div>
      <div className="p-1 bg-gray-800 ">
        <button
          onClick={logoutHandler}
          className="h-12 w-full bg-[#20cfba] focus:outline-none text-white active:bg-[red]"
        >
          Logout
          <FontAwesomeIcon
            icon={faRightFromBracket}
            color="#eee"
            className="pl-2"
          />
        </button>
      </div>
    </div>
  );
};

export default SideBar;
