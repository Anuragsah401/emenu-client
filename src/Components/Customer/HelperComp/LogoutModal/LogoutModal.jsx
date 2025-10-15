import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

import PinInput from "react-pin-input";

const LogoutModal = () => {
  const { tableId } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const logOutHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password) {
      await axios
        .post("/api/customer/logincustomer", { username: tableId, password })
        .then((res) => {
          localStorage.removeItem("customer");
          navigate("/customer");
        })
        .catch((error) => setError(error.response.data.error)).
        finally(() => {
          setLoading(false);
        })
      
    }else {
      setError("Please enter password")
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-semibold text-[2em] py-2 shadow-md">Logout</h1>
      <p className="mt-[2em] text-[1.5em]">
        Please Enter the password to logout!
      </p>

      <form action="" onSubmit={logOutHandler}>
        <PinInput
          length={4}
          initialValue=""
          secret
          secretDelay={100}
          onChange={(value, index) => {
            setPassword(value);
          }}
          type="numeric"
          inputMode="number"
          style={{ padding: "10px", marginTop: "2em" }}
          inputStyle={{
            borderColor: "black",
            marginRight: "1em",
            borderRadius: "5px",
          }}
          inputFocusStyle={{ borderColor: "blue" }}
          autoSelect={true}
          focus={true}
          regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
        />

        {error ? <div className="text-[red]">{error}</div> : null}

        <button
          disabled={loading}
          style={{ cursor: loading ? "not-allowed" : null }}
          className="mt-3 mb-7 px-5 bg-primary text-white bg-[#00000060] py-2 shadow-lg rounded-sm hover:bg-[#fd8585] active:bg-[#fd8585]"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LogoutModal;
