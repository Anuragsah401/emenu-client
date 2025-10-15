import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";

const ScrollDownIcon = () => (
  <FontAwesomeIcon
    className="text-[2rem] fixed z-[49] bottom-7 left-[50%] animate-bounce"
    icon={faAnglesDown}
    color="#000"
  />
);

export default ScrollDownIcon;
