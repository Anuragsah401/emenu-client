import React from 'react'

const LoadingIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ margin: "auto" }}
      width="200"
      height="200"
      display="block"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 100 100"
    >
      <circle cx="84" cy="50" r="10" fill="#e15b64">
        <animate
          attributeName="r"
          begin="0s"
          calcMode="spline"
          dur="0.25s"
          keySplines="0 0.5 0.5 1"
          keyTimes="0;1"
          repeatCount="indefinite"
          values="10;0"
        ></animate>
        <animate
          attributeName="fill"
          begin="0s"
          calcMode="discrete"
          dur="1s"
          keyTimes="0;0.25;0.5;0.75;1"
          repeatCount="indefinite"
          values="#e15b64;#abbd81;#f8b26a;#f47e60;#e15b64"
        ></animate>
      </circle>
      <circle cx="16" cy="50" r="10" fill="#e15b64">
        <animate
          attributeName="r"
          begin="0s"
          calcMode="spline"
          dur="1s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          keyTimes="0;0.25;0.5;0.75;1"
          repeatCount="indefinite"
          values="0;0;10;10;10"
        ></animate>
        <animate
          attributeName="cx"
          begin="0s"
          calcMode="spline"
          dur="1s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          keyTimes="0;0.25;0.5;0.75;1"
          repeatCount="indefinite"
          values="16;16;16;50;84"
        ></animate>
      </circle>
      <circle cx="50" cy="50" r="10" fill="#f47e60">
        <animate
          attributeName="r"
          begin="-0.25s"
          calcMode="spline"
          dur="1s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          keyTimes="0;0.25;0.5;0.75;1"
          repeatCount="indefinite"
          values="0;0;10;10;10"
        ></animate>
        <animate
          attributeName="cx"
          begin="-0.25s"
          calcMode="spline"
          dur="1s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          keyTimes="0;0.25;0.5;0.75;1"
          repeatCount="indefinite"
          values="16;16;16;50;84"
        ></animate>
      </circle>
      <circle cx="84" cy="50" r="10" fill="#f8b26a">
        <animate
          attributeName="r"
          begin="-0.5s"
          calcMode="spline"
          dur="1s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          keyTimes="0;0.25;0.5;0.75;1"
          repeatCount="indefinite"
          values="0;0;10;10;10"
        ></animate>
        <animate
          attributeName="cx"
          begin="-0.5s"
          calcMode="spline"
          dur="1s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          keyTimes="0;0.25;0.5;0.75;1"
          repeatCount="indefinite"
          values="16;16;16;50;84"
        ></animate>
      </circle>
      <circle cx="16" cy="50" r="10" fill="#abbd81">
        <animate
          attributeName="r"
          begin="-0.75s"
          calcMode="spline"
          dur="1s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          keyTimes="0;0.25;0.5;0.75;1"
          repeatCount="indefinite"
          values="0;0;10;10;10"
        ></animate>
        <animate
          attributeName="cx"
          begin="-0.75s"
          calcMode="spline"
          dur="1s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          keyTimes="0;0.25;0.5;0.75;1"
          repeatCount="indefinite"
          values="16;16;16;50;84"
        ></animate>
      </circle>
    </svg>
  )
}

export default LoadingIcon