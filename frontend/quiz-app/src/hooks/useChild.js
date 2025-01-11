import { useState, useEffect } from "react";
import axios from "axios";

export const useChild = () => {
  const [child, setChild] = useState(null); // Assuming you want to store a single child or process the first one
  const [childError, setChildError] = useState(null);
  const [childLoading, setChildLoading] = useState(true);

  useEffect(() => {
    const fetchChildFromSession = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/Child/current", {
          withCredentials: true, // Ensure cookies are sent
        });

        if (res.data && res.data.length > 0) {
          setChild(res.data[0]); // Store the first child if the response is an array
        } else {
          setChild(null);
          setChildError("No child found in session");
        }
      } catch (err) {
        console.error("Error fetching child from session:", err);
        setChildError(err.response?.data?.error || "Unable to fetch session data");
      } finally {
        setChildLoading(false); // Mark as done, whether successful or not
      }
    };

    fetchChildFromSession();
  }, []);

  return { child, childError, childLoading };
};
