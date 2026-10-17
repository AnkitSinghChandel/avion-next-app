import { memo } from "react";
import { Outlet } from "react-router";
import SideBar from "./SideBar";
import SideBar2 from "./SideBar2";
import AppWatchers from "../components/watchers/AppWatchers";
import ComingSoon from "../components/comingSoon/ComingSoon";

const LayoutWithSidebar = () => {
  const sidebarOption = Number(localStorage.getItem("sidebarOption") || "1");

  return (
    <div style={{ display: "flex", gap: "1-0px", minHeight: "100vh" }}>
      {/* <SideBar /> */}
      {sidebarOption === 1 ? <SideBar /> : <SideBar2 />}
      <div
        style={{
          flex: 1,
          overflowY: "hidden",
          padding_old: "15px 20px",
          padding: "15px clamp(12px, 2vw, 20px)",
        }}
      >
        <Outlet />
        {/* <Timer /> */}
        {/* <GlobalTimer /> */}
        <AppWatchers />
        <ComingSoon />
      </div>
    </div>
  );
};

export default memo(LayoutWithSidebar);
