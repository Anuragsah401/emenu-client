import React from 'react'

const OrdersIcon = ({props}) => {
  return (
    <svg
    width={53}
    height={53}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19.455 4.417l-7.994 8.016m22.084-8.016l7.994 8.016"
      stroke="#000"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.417 17.335c0-4.085 2.186-4.416 4.902-4.416h34.362c2.716 0 4.902.331 4.902 4.416 0 4.748-2.186 4.417-4.902 4.417H9.319c-2.716 0-4.902.331-4.902-4.417z"
      stroke="#000"
      strokeWidth={1.5}
    />
    <path
      d="M21.553 30.917v7.84m10.159-7.84v7.84M7.729 22.082l3.114 19.08c.707 4.284 2.407 7.42 8.723 7.42h13.316c6.868 0 7.884-3.003 8.679-7.155l3.71-19.345"
      stroke="#000"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </svg>
  )
}

export default OrdersIcon