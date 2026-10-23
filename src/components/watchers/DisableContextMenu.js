"use client";
import { useEffect, useState } from "react";

const DisableContextMenu = () => {
  // const hostname = window.location.hostname;
  // const userid = localStorage.getItem("userid");

  const [hostname, setHostName] = useState("");
  const [userid, setUserid] = useState("");

  const isAdmin = process.env.NEXT_PUBLIC_ADMIN === userid;

  useEffect(() => {
    setHostName(window.location.hostname);
    setUserid(localStorage.getItem("userid"));
  }, []);

  // disable onContextMenu in whole app
  useEffect(() => {
    // if (process.env.PROD) return;
    if (hostname === "localhost" || isAdmin) return;

    const disableRightClick = (e) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", disableRightClick);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, [hostname, userid, isAdmin]);
};

export default DisableContextMenu;
