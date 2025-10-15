import React from 'react'

const PdfIcon = (props) => {
  return (
    <svg
      width={22}
      height={22}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17.188 19.25H4.813a.687.687 0 01-.688-.688V3.438a.688.688 0 01.688-.687h8.25l4.812 4.813v11a.687.687 0 01-.688.687z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.063 2.75v4.813h4.812M8.594 13.406L11 15.812l2.406-2.406M11 10.313v5.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default PdfIcon