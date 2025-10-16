// Hooks/useAxios.js
import { useState, useEffect, useRef, useCallback } from "react";
import api from "utils/axiosConfig";

export const useAxios = ({ manual = false } = {}) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async ({ url, method = "GET", body = null, headers = {} } = {}) => {
    if (!url) throw new Error("URL is required");
    setLoading(true);
    try {
      const res = await api({
        url,
        method,
        data: body,
        headers,
      });
      setResponse(res.data);
      setError("");
      return res.data;
    } catch (err) {
      const message = err?.response?.data?.error || "Request failed";
      setError(message);
      console.error("Axios error:", message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!manual) {
      // auto-fetch not supported without URL
      console.warn("useAxios auto-fetch requires a URL; skipping fetch because manual=true or URL not provided");
    }
  }, [manual]);

  return { response, error, loading, fetchData };
};
