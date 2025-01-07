import React, { useState } from "react";
import axios from "axios";

const SessionTester = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const testSessionRoute = async () => {
    try {
      // Make a GET request to the /session endpoint
      const res = await axios.get("http://localhost:5000/api/Child/session", {
        withCredentials: true, // Ensure cookies are sent with the request
      });
      setResponse(res.data); // Update state with the response data
      setError(null); // Clear any previous errors
    } catch (err) {
      setResponse(null); // Clear any previous response
      setError(err.response?.data || "An error occurred"); // Update state with the error
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Test /session Route</h1>
      <button onClick={testSessionRoute}>Test Session</button>

      {response && (
        <div style={{ marginTop: "20px", color: "green" }}>
          <h3>Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div style={{ marginTop: "20px", color: "red" }}>
          <h3>Error:</h3>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SessionTester;
