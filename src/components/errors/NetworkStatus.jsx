import React, { useEffect, useState } from "react";

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setMessage("You are now online");
      setTimeout(() => setMessage(""), 3000); // Hide message after 3 seconds
    };

    const handleOffline = () => {
      setIsOnline(false);
      setMessage("Network is offline");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div>
      {message && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            width: "100%",
            padding: "12px",
            margin: "auto",
            backgroundColor: isOnline ? "green" : "red",
            color: "white",
            textAlign: "center",
            fontWeight: 600,
            borderRadius: "12px",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default NetworkStatus;
