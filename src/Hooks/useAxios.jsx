import { useState, useEffect } from "react";
import axios from "axios";

export const useAxios = ({ url }) => {
  // ✅ CRA env variables must start with REACT_APP_
  const apiUrl = process.env.REACT_APP_API_URL

  console.log(apiUrl);
  

  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (url) {
      // ✅ Combine base URL with the endpoint
      const fullUrl = `${apiUrl}${url.startsWith("/") ? url : `/${url}`}`;

      axios
        .get(fullUrl)
        .then((res) => {
          setResponse(res?.data);
        })
        .catch((error) => {
          setError(error?.response?.data?.error || "Request failed");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [url, apiUrl]);

  return { response, error, loading };
};
