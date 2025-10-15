import React from 'react'
import { NavLink } from 'react-router-dom'
import BackIcon from 'Assets/Icons/BackIcon'


const BackToChooseUserBtn = ({children, link}) => {
  return (
    <NavLink
        to={link || "/chooseuser"}
        className="px-3 inline-flex gap-3 items-center py-1  text-white bg-[#C75454] hover:bg-[#20cfba] transition-all duration-[250ms] ease-out rounded-md"
      >
        <BackIcon />
        {children}
      </NavLink>
  )
}

export default BackToChooseUserBtn