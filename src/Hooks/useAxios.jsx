import { useState, useEffect } from "react";

import axios from "axios";

export const useAxios = ({ url }) => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (url) {
      axios
        .get(url)
        .then((res) => {
          setResponse(res?.data);
        })
        .catch((error) => {
          setError(error.response.data.error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [url]);

  return { response, error, loading };
};
