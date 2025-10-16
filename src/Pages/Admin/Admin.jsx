import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSignIn, useAuthUser } from "react-auth-kit";
import api from "utils/axiosConfig"; // ✅ use configured axios
import Title from "Components/UI/Title/Title";
import BackToChooseUserBtn from "Components/UI/BackToChooseUserBtn/BackToChooseUserBtn";

const Admin = () => {
  const signIn = useSignIn();
  const auth = useAuthUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/api/admin/loginadmin", { email, password });

      signIn({
        token: res.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email, user: "admin" },
      });

      navigate("/admin/dashboard");
    } catch (err) {
      setError(err?.response?.data?.error || "Login failed");
    }
  };

  useEffect(() => {
    if (auth() && auth().user === "admin") {
      navigate("/admin/dashboard");
    }
  }, [auth, navigate]);

  const inputStyle = "w-[300px] h-[45px] p-3 border-black border-2 rounded-lg";

  return (
    <div className="bg-[#BCBCBC] h-[100vh] text-center flex flex-col justify-center">
      <Title text="E-menu system" />
      <h1 className="text-[55px] font-bold">Login as Admin</h1>

      <form className="flex-col mt-[2.5rem]" onSubmit={handleAdminLogin}>
        <div className="mb-5">
          <label htmlFor="admin-email" className="mr-[5rem] text-[1.5em]">
            Email:
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className={inputStyle}
            required
          />
        </div>

        <div>
          <label htmlFor="admin-password" className="mr-7 text-[1.5em]">
            Password:
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className={inputStyle}
            required
          />
        </div>

        {error && <p className="text-[red] mt-5">{error}</p>}

        <div className="flex items-center justify-center gap-5 mt-5">
          <BackToChooseUserBtn>Back to choose user</BackToChooseUserBtn>
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

export default Admin;
