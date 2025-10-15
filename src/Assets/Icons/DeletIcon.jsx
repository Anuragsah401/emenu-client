import React from 'react'

const DeletIcon = ({props, width, height, className}) => {
  return (
    <svg
    width={23}
    height={23}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M20.125 5.73a97.465 97.465 0 00-9.602-.478c-1.898 0-3.795.096-5.693.287l-1.955.192m5.27-.968l.212-1.255c.153-.91.268-1.591 1.888-1.591h2.51c1.62 0 1.745.718 1.888 1.6l.211 1.246m3.21 3.996l-.622 9.65c-.106 1.505-.192 2.674-2.866 2.674H8.424c-2.674 0-2.76-1.169-2.866-2.673l-.623-9.65M9.9 15.812h3.19m-3.986-3.834h4.792"
      stroke="#000"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    />
  </svg>
  )
}

export default DeletIcon