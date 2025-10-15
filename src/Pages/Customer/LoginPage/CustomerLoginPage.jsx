import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Title from "Components/UI/Title/Title";
import axios from "axios";
import BackToChooseUserBtn from "Components/UI/BackToChooseUserBtn/BackToChooseUserBtn";


const LoginPage = (props) => {
  const { tableId } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("customer");
    if (isAuthenticated) {
      navigate(`/customer/${tableId}`);
    }
  });

  const handleCustomerLogin = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/customer/logincustomer", { username: tableId, password })
      .then((res) => {
        localStorage.setItem("customer", JSON.stringify(res.data));
        navigate(`/customer/${tableId}`);
      })
      .catch((error) => setError(error.response.data.error));
  };

  const inputStyle =
    "w-[300px] h-[45px] p-3 border-black border-2 rounded-lg ml-10";

  return (
    <div className="h-[100vh] text-center flex flex-col justify-center">
      <Title text="E-menu system" />

      <h1 className="text-[55px] font-bold">Login as Customer</h1>

      <form
        action=""
        className="flex-col mt-[2.5rem]"
        onSubmit={handleCustomerLogin}
      >
        <div className="mb-5">
          <label htmlFor="username" className=" text-[1.5em]">
            Username:
          </label>
          <input
            type="text"
            value={tableId}
            name="username"
            className={inputStyle}
            readOnly
          />
        </div>

        <div>
          <label htmlFor="password" className="mr-2 text-[1.5em]">
            Password:
          </label>
          <input
            onFocus={() => setError("")}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            className={inputStyle}
            required
          />
        </div>

        {error && <p className="text-[red] ml-[9em] mt-5">{error}</p>}

        <div className="flex items-center justify-center gap-5 mt-5">
          <BackToChooseUserBtn link="/customer">Back to choose table</BackToChooseUserBtn>
          <button
            type="submit"
            className="font-semibold px-[5em] py-3 bg-[#20CFBA] rounded-lg hover:bg-[#084942] hover:text-white"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
