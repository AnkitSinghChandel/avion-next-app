import { useState, useEffect } from "react";

const getDeviceType = () => {
  if (typeof window === "undefined") return "webView";

  const width = window.innerWidth;

  if (width <= 767) return "mobileView";
  if (width <= 1024) return "tabView";

  return "webView";
};

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState(getDeviceType);

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return deviceType;
};

export default useDeviceType;
