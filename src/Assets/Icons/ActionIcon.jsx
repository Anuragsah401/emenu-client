import React from 'react'

const ActionIcon = ({props}) => {
  return (
    <svg
      width={32}
      height={32}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16 19a3 3 0 100-6 3 3 0 000 6zM6 19a3 3 0 100-6 3 3 0 000 6zM26 19a3 3 0 100-6 3 3 0 000 6z"
        stroke="#000"
        strokeWidth={2}
        strokeMiterlimit={10}
      />
    </svg>
  )
}

export default ActionIcon