import { useState, useEffect } from "react";
import axios from "axios";

export const useChildSession = () => {
  const [childId, setChildId] = useState(null);
  const [studyLevel, setStudyLevel] = useState(null);
  const [sessionError, setSessionError] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchChildIdFromSession = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/Child/session", {
          withCredentials: true, // Ensure cookies are sent
        });
        setChildId(res.data.childId);
        setStudyLevel(res.data.studyLevel);
        setUserId(res.data.userId);
        setSessionError(null);
      } catch (err) {
        console.error("Error fetching childId from session:", err);
        setSessionError(err.response?.data?.error || "Unable to fetch session data");
      } finally {
        setSessionLoading(false); // Mark as done, whether successful or not
      }
    };

    fetchChildIdFromSession();
  }, []);

  return {userId, childId, studyLevel, sessionError, sessionLoading };
};
