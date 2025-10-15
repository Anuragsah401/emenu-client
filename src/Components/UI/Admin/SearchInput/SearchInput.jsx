import React from 'react'

const SearchFoodInput = ({placeholder, setInputText}) => {

    const searchHandler = (e) => {
        setInputText(e.target.value.toLowerCase())
    };

  return (
    <input type="text" onChange={searchHandler} name="" className='px-5 border border-black rounded-md bg-transparent w-[30%] h-[40px]' placeholder={placeholder}/>
  )
}

export default SearchFoodInput