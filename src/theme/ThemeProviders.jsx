"use client";
// screen theme + toggle
import React, { useEffect } from "react";

const ThemeProviders = () => {
  useEffect(() => {
    // Screen Theme
    const savedTheme = localStorage.getItem("screenTheme") || "theme-default";
    document.documentElement.setAttribute("data-theme", savedTheme);

    // Light / Dark Mode
    const savedMode = localStorage.getItem("systemMode") || "light";
    document.documentElement.setAttribute("data-mode", savedMode);
  }, []);

  return;
};

export default ThemeProviders;
