"use client";
import React, { useEffect } from "react";

const DisableContextMenu = () => {
  // const hostname = window.location.hostname;
  const userid = localStorage.getItem("userid");
  const isAdmin = process.env.NEXT_PUBLIC_ADMIN === userid;

  // disable onContextMenu in whole app
  useEffect(() => {
    const hostname = window.location.hostname;

    // if (process.env.PROD) return;
    if (hostname === "localhost" || isAdmin) return;

    const disableRightClick = (e) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", disableRightClick);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, [userid, isAdmin]);
};

export default DisableContextMenu;
