import React, { useState, useEffect } from "react";

import { useAxios } from "Hooks/useAxios";

import axios from "axios";

import ContainerTitle from "Components/UI/Admin/ContainerTitle/ContainerTitle";
import { notify } from "Components/UI/Toast/Toast";

const EditCustomerForm = () => {
  // taking id from url
  const searchParams = new URLSearchParams(document.location.search)


  const { response, loading } = useAxios({ url: `/api/customer/${searchParams.get('id')}` });


 useEffect(() => {
    if (response !== null) {
      setUserName(response?.username);
    }
  }, [response]);

  
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [disableBtn, setDisabledBtn] = useState(false);
  
    const createUser = async (e) => {
      setDisabledBtn(true);
      setError("");
      e.preventDefault();
      await axios
        .patch(`/api/customer/updateusernameandpassword/${searchParams.get('id')}`, {
          username: userName,
          password: password,
        })
        .then((res) => {
          console.log(res);
          notify(`Customer/User was updated!`);
        })
        .catch((error) => setError(error.response.data.error));
      setDisabledBtn(false);
    };
  
    const inputStyle =
      "w-[300px] h-[45px] p-3 border-black border-2 rounded-lg ml-10";
  
    return (
      <div className="flex justify-center">
        <div className=" py-[3.5em]">
          <ContainerTitle title="Edit User or Customer" />
  
          <form action="" className="flex-col mt-[2.5rem]" onSubmit={createUser}>
            <div className="mb-5">
              <label htmlFor="username" className=" text-[1.5em]">
                Username:
              </label>
              <input
                type="text"
                name="username"
                className={`${inputStyle} ml-[6em]`}
                required
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
              />
            </div>
  
            <div>
              <label htmlFor="password" className="mr-2 text-[1.5em]">
                New Password:
              </label>
              <input
                type="password"
                name="password"
                className={inputStyle}
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
  
            {error && (
              <div className="text-[red] text-center pl-[10em] mt-3">{error}</div>
            )}
  
            <button
              disabled={disableBtn}
              style={{ cursor: disableBtn ? "not-allowed" : "", }}
              className="font-semibold mt-8 px-[5em] py-3 bg-[#20CFBA] rounded-lg ml-[15em] hover:bg-[#084942] hover:text-white"
            >
              Update User
            </button>
          </form>
        </div>
        
      </div>
    );
}

export default EditCustomerForm