import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSignIn, useAuthUser } from "react-auth-kit";

import Title from "Components/UI/Title/Title";
import BackToChooseUserBtn from "Components/UI/BackToChooseUserBtn/BackToChooseUserBtn";
import { useAxios } from "Hooks/useAxios";

const Kitchen = () => {
  const signIn = useSignIn();
  const auth = useAuthUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ⬇ useAxios in manual mode (won’t fetch automatically)
  const { fetchData, error, loading } = useAxios({ manual: true });

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    const res = await fetchData({
      url: "/api/kitchen/loginkitchen",
      method: "POST",
      body: { email, password },
    });

    if (!res) return; // ❌ Error handled automatically by hook

    signIn({
      token: res.token,
      expiresIn: 3600,
      tokenType: "Bearer",
      authState: { email, user: "kitchen" },
      refreshToken: res.refreshToken,
      refreshTokenExpireIn: res.refreshTokenExpireIn,
    });

    navigate("/kitchen/orders");
  };

  // 🔄 Redirect if already logged in as kitchen user
  useEffect(() => {
    if (auth() && auth().user === "kitchen") {
      navigate("/kitchen/orders");
    }
  }, [auth, navigate]);

  const inputStyle = "w-[300px] h-[45px] p-3 border-black border-2 rounded-lg";

  return (
    <div className="bg-[#BCBCBC] h-[100vh] text-center flex flex-col justify-center">
      <Title text="E-menu system" />

      <h1 className="text-[55px] font-bold">Login as Kitchen</h1>

      <form className="flex-col mt-[2.5rem]" onSubmit={handleAdminLogin}>
        <div className="mb-5">
          <label htmlFor="admin-email" className="mr-[5rem] text-[1.5em]">
            Email:
          </label>
          <input onChange={(e) => setEmail(e.target.value)} type="email" className={inputStyle} />
        </div>

        <div>
          <label htmlFor="admin-password" className="mr-7 text-[1.5em]">
            Password:
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className={inputStyle}
          />
        </div>

        {error && <p className="text-red-600 font-semibold mt-3">{error}</p>}

        <div className="flex items-center justify-center gap-5 mt-5">
          <BackToChooseUserBtn>Back to choose user</BackToChooseUserBtn>
          <button
            type="submit"
            disabled={loading}
            className={`font-semibold px-[5em] py-3 rounded-lg ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#20CFBA] hover:bg-[#084942] hover:text-white"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Kitchen;
