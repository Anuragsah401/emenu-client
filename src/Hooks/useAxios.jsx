import { useState, useEffect, useRef } from "react";
import axios from "axios";

export const useAxios = ({ url, method = "GET", body = null, headers = {} }) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const bodyRef = useRef(body);
  const headersRef = useRef(headers);

  useEffect(() => {
    if (!url) return;

    const fullUrl = `${apiUrl}${url.startsWith("/") ? url : `/${url}`}`;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios({
          method,
          url: fullUrl,
          data: bodyRef.current,
          headers: headersRef.current,
          withCredentials: true,
        });
        setResponse(res.data);
      } catch (err) {
        setError(err?.response?.data?.error || "Request failed");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, apiUrl, method]); // ✅ no object dependencies

  return { response, error, loading };
};
