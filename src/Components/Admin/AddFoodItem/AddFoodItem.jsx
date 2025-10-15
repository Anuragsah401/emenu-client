import React, { useState } from "react";

import ContainerLayout from "Components/UI/Admin/ContainerLayout/ContainerLayout";
import ContainerTitle from "Components/UI/Admin/ContainerTitle/ContainerTitle";
import UploadImage from "./UploadImage";

import axios from "axios";

import { notify } from "Components/UI/Toast/Toast";

const AddFoodItem = () => {
  const preventNegativeValue = (e) => {
    return !!e.target.value && Math.abs(e.target.value) >= 0
      ? Math.abs(e.target.value)
      : null;
  };

  const labelStyle = "text-[1.2em] mt-3";
  const inputStyle = "px-2 py-1 border border-black rounded-md bg-transparent";

  const title = "Add Food Item";
  const description = "Add new Food Item in the menu list";

  const [foodName, setFoodName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState([]);

  const addFoodItemHandler = async (e) => {
    e.preventDefault();

      const formData = new FormData();
      formData.append("name", foodName);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("img", image[0].file);

      await axios
        .post("/api/food", formData)
        .then((res) => {
          
          notify(`"${res.data.name}" was added to ${category}!`);
          setFoodName("");
          setCategory("");
          setPrice("");
          setImage([]);
        })
        .catch((error) => console.log(error.response.data.error));
      // setDisabledBtn(false);
    
  };

  return (
    <ContainerLayout title={title} description={description}>
      <div className="flex justify-center">
        <div className="px-[3em] py-[1em]">
          <ContainerTitle title="Create Food Items to menu List" />

          <form
            onSubmit={addFoodItemHandler}
            className="flex flex-col gap-1 mt-5"
          >
            <label htmlFor="foodName" className={labelStyle}>
              Food Name:
            </label>
            <input
              type="text"
              name="foodName"
              className={inputStyle}
              value={foodName}
              placeholder="eg. fried rice"
              required
              onChange={(e) => setFoodName(e.target.value)}
            />

            <label htmlFor="chooseCategory" className={labelStyle}>
              Choose Category:
            </label>
            <select
              name="chooseCategory"
              className={inputStyle}
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" className="text-[#9CA3B2]">
                Please Choose...
              </option>
              <option value="backery">Backery</option>
              <option value="baverages">Baverages</option>
              <option value="breakfast">Breakfast</option>
              <option value="desserts">Desserts</option>
              <option value="lunch">Lunch</option>
              <option value="snacks">Snacks</option>
            </select>

            <label htmlFor="price" className={labelStyle}>
              Price:
            </label>
            <input
              value={price}
              type="number"
              name="price"
              className={inputStyle}
              min="1"
              onInput={preventNegativeValue}
              required
              onChange={(e) => setPrice(e.target.value)}
            />

            <label htmlFor="image" className={labelStyle}>
              Image:
            </label>
            <UploadImage image={image} setImage={setImage} required={true}/>

            <button className="w-[300px] font-semibold mt-5 px-[5em] py-3 bg-[#20CFBA] rounded-lg ml-[7em] hover:bg-[#084942] hover:text-white">
              Add Food Item
            </button>
          </form>
        </div>
      </div>
      
    </ContainerLayout>
  );
};

export default AddFoodItem;

// Aankhein jhukti chubhan mein
// Ashkon mein magan yeh
// Kaisi teri saansein chadh gayi

// Ho sakhiyan dekhe anjuman mein
// Soche sab mann mein
// Kaisi kaisi baatein ban gayi

// struming

// Teri aankh yeh jo namm hai
// Inmein jo gham hai

// Chhod ke subah pe kar yakeen
// Ho yeh jo jhoomta sawan hai
// Meethi jo pawan hai
// Teri hi muskaan se hai bani

// Cm Am F G F G C
// Ho teri baaton ki chehak ko na jaane
// Na jaane kaisi raat mil gayi
// Na jaane kaisi raat mil gayi
