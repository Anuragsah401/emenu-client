import React from "react";

import QuestionIcon from "Assets/Icons/QuestionIcon";

import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const ContainerLayout = ({ children, title, description }) => {
  return (
    <div className="py-2 px-5 xl:p-5 ">
      <div className="flex gap-1 mt-7 mb-4">
        <h3 className="text-[27px]">{title}</h3>
        <div id="attributes-basic" data-tooltip-content={description}>
          <QuestionIcon />
        </div>
        <Tooltip anchorId="attributes-basic" className="z-50"/>
      </div>

      <div className="shadow-md rounded-md bg-[#D9D9D9] p-5">{children}</div>
    </div>
  );
};

export default ContainerLayout;
