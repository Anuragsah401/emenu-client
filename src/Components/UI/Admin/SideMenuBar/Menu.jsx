import React from "react";

const Menu = ({ children, isTransparent }) => {
  return (
    <button className={`
    ${isTransparent ? "bg-transparent" : "bg-[#D9D9D9]"}
     group w-[210px] h-[45px] flex items-center justify-center gap-[14px] font-semibold rounded-md hover:text-white hover:bg-[#c75454] transition-all duration-[250ms]`}
     >
      {children}
    </button>
  );
};

export default Menu;
