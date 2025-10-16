import { useState, useEffect } from "react";
import axios from "axios";

export const useAxios = ({ url, method = "GET", body = null, headers = {} }) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!url) return;

    const fullUrl = `${apiUrl}${url.startsWith("/") ? url : `/${url}`}`;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios({
          method,
          url: fullUrl,
          data: body,
          headers,
          withCredentials: true, // if backend uses cookies
        });
        setResponse(res.data);
      } catch (err) {
        setError(err?.response?.data?.error || "Request failed");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, apiUrl, method, body, headers]);

  return { response, error, loading };
};
