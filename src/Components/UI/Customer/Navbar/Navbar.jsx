import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import Backdrop from "../../Backdrop/Backdrop";
import BellIcon from "Assets/Icons/BellIcon";
import CustomerNotification from "./CustomerNotification";

const Navbar = (props) => {
  const navigate = useNavigate();

  const sideBarOpenHandler = () => {
    props.setBackDrop(true);
    props.setSideBar(true);
  };

  const sideBarCloseHandler = () => {
    props.setBackDrop(false);
    props.setSideBar(false);
  };

  const [searchedText, setSearchedText] = useState("");

  const handleSearchResult = (e) => {
    e.preventDefault();
    if (searchedText) {
      navigate(`${searchedText}`);
    }
  };

  return (
    <div className="py-3 bg-[#eee] shadow-lg fixed w-full z-30">
      <div className=" container max-w-[90rem] flex justify-between items-center text-center relative">
        <Link to="">
          <div className="font-Pacifico text-[1.3rem] text-[#000]">E-menu</div>
        </Link>
        <div>
          <form action="search" onSubmit={handleSearchResult}>
            <input
              onChange={(e) => setSearchedText(e.target.value)}
              type="text"
              placeholder="search your fav food..."
              className="p-[0.6rem] w-[300px] rounded-l-lg outline-none bg-slate-800 text-white placeholder-[#aaa7a7]"
            />
            <button className="py-[0.6rem] px-[0.8rem] text-white bg-[#20CFBA] hover:bg-black rounded-r-lg">
              Search
            </button>
          </form>
        </div>

        <div className="flex gap-[4em] items-center">
          <CustomerNotification />
          <div
            onClick={sideBarOpenHandler}
            className=" py-[0.1rem] px-[0.3rem] text-center border-2 border-black cursor-pointer"
          >
            <FontAwesomeIcon icon={faBars} size="lg" color="#000" />
          </div>
          {props.backDrop ? (
            <Backdrop CloseHandler={sideBarCloseHandler} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
