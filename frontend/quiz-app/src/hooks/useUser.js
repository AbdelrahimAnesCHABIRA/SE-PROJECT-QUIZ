import { useState, useEffect } from "react";
import axios from "axios";

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/User/profile", {
          withCredentials: true, // Ensure cookies are sent for session-based authentication
        });

        setUser(response.data.user);
        setUserError(null);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setUserError(err.response?.data?.error || "Failed to fetch user profile");
        setUser(null);
      } finally {
        setUserLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return { user, userLoading, userError };
};
