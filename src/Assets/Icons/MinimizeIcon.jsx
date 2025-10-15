import React from 'react'

const MinimizeIcon = (props) => {
  return (
    <svg
      width={25}
      height={25}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.844 5.469v4.687h4.687M20.313 4.688l-5.47 5.468M5.469 14.844h4.687v4.687M4.688 20.313l5.468-5.47"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default MinimizeIcon