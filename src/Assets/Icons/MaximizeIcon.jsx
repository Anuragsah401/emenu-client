import React from 'react'

const MaximizeIcon = (props) => {
  return (
    <svg
    width={25}
    height={25}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.625 4.688h4.688v4.687M14.844 10.156l5.469-5.469M9.375 20.313H4.687v-4.688M10.156 14.844l-5.469 5.469"
      stroke="#000"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
  )
}

export default MaximizeIcon