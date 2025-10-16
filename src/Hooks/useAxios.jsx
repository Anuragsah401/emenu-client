// Hooks/useAxios.js
import { useState, useEffect, useRef, useCallback } from "react";
import api from "utils/axiosConfig";

export const useAxios = ({
  url,
  method = "GET",
  body = null,
  headers = {},
  manual = false, // 👈 default false = auto fetch
}) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const bodyRef = useRef(body);
  const headersRef = useRef(headers);

  const fetchData = useCallback(
    async (overrideConfig = {}) => {
      setLoading(true);
      try {
        const res = await api({
          method,
          url,
          data: overrideConfig.body || bodyRef.current,
          headers: overrideConfig.headers || headersRef.current,
          // 👈 allows overriding URL/method if needed
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
    },
    [url, method]
  );

  useEffect(() => {
    if (!manual && url) {
      // ✅ only auto-fetch for non-manual calls
      const controller = new AbortController();
      fetchData({ signal: controller.signal }).catch(() => {});
      return () => controller.abort();
    }
  }, [url, manual, fetchData]);

  return { response, error, loading, fetchData };
};
