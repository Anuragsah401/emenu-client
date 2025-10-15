import React from 'react'

const BellIcon = ({ props, height, width, className }) => {
  return (
    <svg
      width={width || 33}
      height={height || 33}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      
    >
      <path
        d="M16.527 4.001c-4.55 0-8.25 3.699-8.25 8.25v3.974c0 .839-.357 2.117-.783 2.832l-1.582 2.627c-.976 1.622-.302 3.424 1.486 4.028a28.766 28.766 0 0018.246 0c1.664-.55 2.392-2.516 1.485-4.028l-1.582-2.627c-.412-.714-.77-1.993-.77-2.832v-3.974c0-4.537-3.712-8.25-8.25-8.25z"
        stroke="#000"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        className={className}
      />
      <path
        d="M19.071 4.4a9.287 9.287 0 00-5.087 0 2.73 2.73 0 012.543-1.733A2.73 2.73 0 0119.072 4.4v0z"
        stroke="#000"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      />
      <path
        d="M20.652 26.207a4.137 4.137 0 01-4.125 4.125 4.14 4.14 0 01-2.915-1.21 4.139 4.139 0 01-1.21-2.915"
        stroke="#000"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        className={className}
        
      />
    </svg>
  )
}

export default BellIcon