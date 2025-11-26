// Hooks/useAxios.js
import { useState, useEffect, useCallback, useRef } from "react";
import api from "utils/axiosConfig";

export const useAxios = ({
  url,
  method = "GET",
  body = null,
  headers = {},
  manual = false,
} = {}) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Track if request has been made (prevents duplicates)
  const hasFetched = useRef(false);

  const fetchData = useCallback(
    async (overrideConfig = {}) => {
      const fetchUrl = overrideConfig.url || url;
      if (!fetchUrl) throw new Error("URL is required");

      setLoading(true);
      try {
        const res = await api({
          url: fetchUrl,
          method: overrideConfig.method || method,
          data: overrideConfig.body || body,
          headers: overrideConfig.headers || headers,
        });
        setResponse(res?.data);
        setError("");
        return res?.data;
      } catch (err) {
        const message = err?.response?.data?.error || "Request failed";
        setError(message);
        console.error("Axios error:", message);
      } finally {
        setLoading(false);
      }
    },
    [] // ✅ no dynamic dependencies (keeps it stable)
  );

  useEffect(() => {
    if (!manual && url && !hasFetched.current) {
      hasFetched.current = true;
      fetchData({ url });
    }
  }, [manual, url, fetchData]);

  return { response, error, loading, fetchData };
};
