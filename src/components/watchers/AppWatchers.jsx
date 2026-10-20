import DisableContextMenu from "./DisableContextMenu";
import SendingMail from "./SendingMail";
import ThemeProviders from "../../theme/ThemeProviders";

// we can call here to watch all screen , all rounting
const AppWatcher = () => {
  return (
    <>
      <DisableContextMenu />
      <SendingMail />
      <ThemeProviders />
    </>
  );
};

export default AppWatcher;
