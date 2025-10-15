import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAxios } from "Hooks/useAxios";
import axios from "axios";
import { notify } from "Components/UI/Toast/Toast";

import ContainerTitle from "Components/UI/Admin/ContainerTitle/ContainerTitle";
import UploadImage from "Components/Admin/AddFoodItem/UploadImage";
import LoadingIcon from "Assets/Icons/LoadingIcon";
import PreviewFoodCard from "../PreviewFoodCard/PreviewFoodCard";

const FoodItemEditForm = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const [foodName, setFoodName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState([]);
  const [available, setAvailable] = useState("");
  const [previewImg, setPreviewImg] = useState(null);
  const [isImageFromApi, setIsImageFromApi] = useState(true);

  const { response, loading, error } = useAxios({ url: `/api/food/${id}` });

  useEffect(() => {
    if (image.length !== 0) {
      setPreviewImg(URL.createObjectURL(image[0].file));
      setIsImageFromApi(false);
    }
  }, [image]);

  useEffect(() => {
    if (response !== null) {
      setFoodName(response?.name);
      setCategory(response?.category);
      setPrice(response?.price);
      setPreviewImg(response?.img);
      setAvailable(response?.available);
    }
  }, [response]);

  const addFoodItemHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", foodName);
    formData.append("price", price);
    formData.append("img", image.length !== 0 ? image[0]?.file : response?.img);
    formData.append("available", available === "yes" ? true : false);
    formData.append('category', category)

    await axios
      .patch(`/api/food/${id}`, formData)
      .then((res) => {
       
        notify(`food item was updated!`);
      })
      .catch((error) => console.log(error.response.data.error));
    // setDisabledBtn(false);
  };

  const preventNegativeValue = (e) => {
    return !!e.target.value && Math.abs(e.target.value) >= 0
      ? Math.abs(e.target.value)
      : null;
  };

  const foodDetail = { _id: id, name: foodName, price, img: previewImg };

  const labelStyle = "text-[1.2em] mt-3";
  const inputStyle =
    "px-2 py-1 border border-black rounded-md bg-transparent capitalize";

  return (
    <>
      <div className="flex justify-between mx-[3em]">
        <div className=" py-[1em] w-[30rem]">
          <ContainerTitle title="Edit Food Items List" gap="gap-[3em]" />
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
              <option value="bakery">Bakery</option>
              <option value="beverages">Beverages</option>
              <option value="breakfast">Breakfast</option>
              <option value="desserts">Desserts</option>
              <option value="lunch">Lunch</option>
              <option value="snacks">Snacks</option>
            </select>

            <label htmlFor="available" className={labelStyle}>
              Available:
            </label>
            <select
              name="available"
              className={inputStyle}
              required
              value={available === true ? "yes" : "no"}
              onChange={(e) => setAvailable(e.target.value)}
            >
              <option value="yes">yes</option>
              <option value="no">no</option>
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
            <UploadImage image={image} setImage={setImage} required={false} />

            <button className=" font-semibold mt-5 px-[5em] py-3 bg-[#20CFBA] rounded-lg  hover:bg-[#084942] hover:text-white">
              Update Food Item
            </button>
          </form>
        </div>

        <div className="w-[300px] py-[1em]">
          {loading ? (
            <LoadingIcon />
          ) : (
            <>
              <h2 className="text-[1.5em] mb-10 mt-1">Preview</h2>
              <PreviewFoodCard
                food={foodDetail}
                disable
                isImageFromApi={isImageFromApi}
              />
            </>
          )}
        </div>
      </div>
     
    </>
  );
};

export default FoodItemEditForm;
