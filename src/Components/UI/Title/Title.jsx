import React from "react";

const Title = ({size, text}) => {
  return (
    <>
      <h3 className={`font-Pacifico ${size ? `text-[${size}]` : `text-[2em]`}`}>
        {text}
      </h3>
    </>
  );
};

export default Title;
