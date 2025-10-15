import React from 'react'

const EditIcon = ({props, className}) => {
  return (
    <svg
    width={23}
    height={23}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10.541 1.917H8.625c-4.792 0-6.708 1.916-6.708 6.708v5.75c0 4.792 1.916 6.708 6.708 6.708h5.75c4.791 0 6.708-1.916 6.708-6.708v-1.917"
      stroke="#000"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    />
    <path
      d="M15.372 2.894L7.82 10.446c-.287.287-.575.853-.632 1.265l-.412 2.884c-.154 1.045.584 1.774 1.629 1.63l2.884-.412c.403-.058.968-.345 1.265-.633l7.552-7.552c1.303-1.303 1.917-2.817 0-4.734-1.917-1.916-3.43-1.303-4.734 0zM14.289 3.977a6.846 6.846 0 004.734 4.734"
      stroke="#000"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    />
  </svg>
  )
}

export default EditIcon