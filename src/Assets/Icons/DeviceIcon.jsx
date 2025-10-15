import React from 'react'

const DeviceIcon = ({props}) => {
  return (
    <svg
      width={254}
      height={292}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M206.375 237.25V54.75c0-10.08-7.107-18.25-15.875-18.25h-127c-8.767 0-15.875 8.17-15.875 18.25v182.5c0 10.079 7.108 18.25 15.875 18.25h127c8.768 0 15.875-8.171 15.875-18.25z"
        stroke="#000"
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M95.25 73h63.5"
        stroke="#000"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default DeviceIcon