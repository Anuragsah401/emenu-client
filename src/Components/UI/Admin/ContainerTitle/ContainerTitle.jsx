import React from 'react'
import BackIcon from "Assets/Icons/BackIcon";

import { useNavigate } from "react-router";

const ContainerTitle = ({title, gap}) => {
    const navigate = useNavigate();

    const backHandler = () => {
      navigate(-1);
    };

    const flexGap = gap || "gap-[5em]"

  return (
    <div className={`flex items-center ${flexGap}`}>
    <button onClick={backHandler} aria-label="Go back" className='hover:text-[red]'>
      <BackIcon />
    </button>
    <h2 className="text-[1.5em]">{title}</h2>
  </div>
  )
}

export default ContainerTitle