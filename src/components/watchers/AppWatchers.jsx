import { useEffect } from "react";
import { useLocation } from "react-router";
import DisableContextMenu from "./DisableContextMenu";
import SendingMail from "./SendingMail";

// we can call here to watch all screen , all rounting
const AppWatcher = () => {
  return (
    <>
      <DisableContextMenu />
      <SendingMail />
    </>
  );
};

export default AppWatcher;
