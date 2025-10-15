import React from 'react'

const BackIcon = ({props}) => {
  return (
    <svg
      width={40}
      height={40}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}

    >
      <path
        d="M20 35c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15-8.284 0-15 6.716-15 15 0 8.284 6.716 15 15 15z"
        stroke="currentColor"
        strokeWidth={2}
        strokeMiterlimit={10}
        
      />
      <path
        d="M19.047 25.297L13.75 20l5.297-5.297M13.75 20h12.5"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default BackIcon