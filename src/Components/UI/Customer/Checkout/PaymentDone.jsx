import React from 'react'

import ThanksImg from "Assets/Images/thankyou.jpg";

const PaymentDone = () => {
  return (
    <div>
      <img src={ThanksImg} alt="thankspicture" className='w-[400px] h-[300px] object-contain' />
      <div className='text-[1.4em] font-semibold'>Do visit again!</div>
    </div>
  )
}

export default PaymentDone