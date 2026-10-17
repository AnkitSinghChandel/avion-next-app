import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate, matchPath } from "react-router";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "../styles/ProSideBar.css";
import { Layout, Tooltip } from "antd";
import {
  UserOutlined,
  UsergroupAddOutlined,
  DashboardOutlined,
  FolderOpenOutlined,
  AppstoreOutlined,
  ScheduleOutlined,
  ScanOutlined,
  DatabaseOutlined,
  HddOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  IdcardOutlined,
  ContactsOutlined,
  SolutionOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import Hamburger from "hamburger-react";
import useDeviceType from "./useDeviceType";
import toast from "../components/notification/CustomToast";
import { FinIcon } from "../components/customSVG/CustomSVG";

const ProSideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const deviceType = useDeviceType(); // Store device type in a variable.
  const isWebView = deviceType === "webView";
  const isMobileView = deviceType === "mobileView";
  const isTabView = deviceType === "tabView";

  const userid = localStorage.getItem("userid");
  const isAdmin = process.env.NEXT_PUBLIC_ADMIN === userid;

  const isSidebarOpenRes = useSelector((state) => state.user.isSidebarOpenRes);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleCollapse = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    if (isSidebarOpenRes) {
      setSidebarOpen(isSidebarOpenRes?.isSidebarOpen);
    }
  }, [isSidebarOpenRes]);

  // Active route check
  const isActive = (path) => {
    return matchPath(
      {
        path,
        end: true,
      },
      location.pathname,
    );
  };

  return (
    <Sidebar
      toggled={sidebarOpen}
      onBackdropClick={() => setSidebarOpen(false)}
      //   onBreakPoint={setBroken}
      breakPoint="md"
      collapsed={sidebarOpen}
      width="200px"
      collapsedWidth="80px"
      backgroundColor="var(--bg)"
      rootStyles={{
        "&:not(.ps-broken)": {
          position: "sticky",
          top: 0,
        },

        "& > .ps-sidebar-container": {
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        },
        height: "100dvh",
        color: "#8ba1b7",
      }}
      image="https://res.cloudinary.com/dlu4uc0ff/image/upload/v1789205963/wa6bswibojo0dy0c3zkr.webp"
    >
      {/* ========== Header with logo ========== */}
      <div className="relative pt-6.5 pb-2 flex flex-wrap justify-center items-center">
        <div className="pointer">
          <p
            className="text-[16px] text-(--badge-bg) font-semibold flex justify-center"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            {/* <img src="/fin.png" className="w-7.5 h-6" /> */}
            <FinIcon />
            Avion
          </p>
        </div>

        <div
          className="hidde-n"
          onClick={() => {
            toggleCollapse();
          }}
        >
          <Hamburger
            toggled={sidebarOpen}
            // toggle={setSidebarOpen}
            toggle={() => setSidebarOpen((pre) => !pre)}
            size={18}
            color="var(--badge-bg)"
          />
        </div>
      </div>

      {/* ========== All Menu options start ========== */}

      <div
        style={{
          height: "calc(100vh - 80px)",
          overflowY: "auto",
          overflowX: "hidden",
          scrollbarWidth: "thin",
        }}
      >
        <Menu
          popover
          closeOnClick
          menuItemStyles={{
            button: ({ active }) => ({
              backgroundColor: active
                ? "var(--selected-sidebar-bg)"
                : "transparent",
              boxShadow: active ? "var(--my-shadow)" : "none",
              borderRadius: active ? "8px" : "8px",
              color: active ? "#fff" : "inherit",
              "&:hover": {
                backgroundColor: "#ebebeb",
                color: "#1890ff",
              },
            }),
          }}
          className="custom-sidebar-menu px-2"
        >
          <p className="ps-7 pb-2 sidebar-category">General</p>
          {/* ========== Dashboard option ========== */}
          <MenuItem
            icon={<DashboardOutlined />}
            active={isActive("/dashboard")}
            onClick={() => navigate("/dashboard")}
            className="sidebar-menu-item"
          >
            Dashboard
          </MenuItem>

          {/* ========== Profile option ========== */}
          <MenuItem
            icon={<ContactsOutlined />}
            active={isActive("/profile/:id")}
            onClick={() => navigate(`/profile/${userid}`)}
            className="sidebar-menu-item"
          >
            Profile
          </MenuItem>

          {/* ========== User option ========== */}
          <MenuItem
            icon={<UserOutlined />}
            active={isActive("/users")}
            onClick={() => navigate("/users")}
            className="sidebar-menu-item"
          >
            Users
          </MenuItem>

          {/* ========== Teams section ========== */}
          <p className="ps-7 py-2">General</p>

          <SubMenu
            icon={<UsergroupAddOutlined />}
            label="Teams"
            defaultOpen={
              isActive("/teams") ||
              isActive("/teams/create") ||
              isActive("/teams/:id/edit")
            }
            className="sidebar-submenu"
          >
            <MenuItem
              active={isActive("/teams") || isActive("/teams/:id/edit")}
              onClick={() => navigate("/teams")}
              className="sidebar-menu-item"
            >
              Teams
            </MenuItem>

            <MenuItem
              active={isActive("/teams/create")}
              onClick={() => navigate("/teams/create")}
              className="sidebar-menu-item"
            >
              Add Team
            </MenuItem>
          </SubMenu>

          {/* ========== Products section ========== */}
          <SubMenu
            icon={<AppstoreOutlined />}
            label="Products"
            defaultOpen={
              isActive("/products") ||
              isActive("/products/create") ||
              isActive("/products/:id/edit") ||
              isActive("/product/:id")
            }
            className="sidebar-submenu"
          >
            <MenuItem
              active={
                isActive("/products") ||
                isActive("/products/:id/edit") ||
                isActive("/product/:id")
              }
              onClick={() => navigate("/products")}
              className="sidebar-menu-item"
            >
              Products
            </MenuItem>

            <MenuItem
              active={isActive("/products/create")}
              onClick={() => navigate("/products/create")}
              className="sidebar-menu-item"
            >
              Add Product
            </MenuItem>
          </SubMenu>

          {/* ========== Supplier section ========== */}
          <SubMenu
            icon={<SolutionOutlined />}
            label="Suppliers"
            defaultOpen={
              isActive("/suppliers") ||
              isActive("/suppliers/create") ||
              isActive("/suppliers/:id/edit")
            }
            className="sidebar-submenu"
          >
            <MenuItem
              active={isActive("/suppliers") || isActive("/suppliers/:id/edit")}
              onClick={() => navigate("/suppliers")}
              className="sidebar-menu-item"
            >
              Suppliers
            </MenuItem>

            <MenuItem
              active={isActive("/suppliers/create")}
              onClick={() => navigate("/suppliers/create")}
              className="sidebar-menu-item"
            >
              Add Supplier
            </MenuItem>
          </SubMenu>

          {/* ========== Inventory option ========== */}
          <MenuItem
            icon={<HddOutlined />}
            active={isActive("/stock")}
            onClick={() => navigate("/stock")}
            className="sidebar-menu-item"
          >
            Inventory
          </MenuItem>

          {/* ========== Report option ========== */}
          <MenuItem
            icon={<BarChartOutlined />}
            onClick={() =>
              toast.info({
                description: "Reports module is under development.",
              })
            }
            className="sidebar-menu-item"
          >
            Report
          </MenuItem>

          {/* ========== Task option ========== */}
          <MenuItem
            icon={<ScheduleOutlined />}
            active={isActive("/task/*")}
            onClick={() => navigate("/task")}
            className="sidebar-menu-item"
          >
            Tasks
          </MenuItem>

          {/* ========== Scanner option ========== */}
          <MenuItem
            icon={<ScanOutlined />}
            active={isActive("/scanner")}
            onClick={() => navigate("/scanner")}
            className="sidebar-menu-item"
          >
            Scanner
          </MenuItem>

          {/* ========== Settings option ========== */}
          <MenuItem
            icon={<SettingOutlined spin style={{ animationDuration: "3s" }} />}
            active={isActive("/settings")}
            onClick={() => navigate("/settings")}
            className="sidebar-menu-item"
          >
            Settings
          </MenuItem>

          {/* ========== ASC folder section ========== */}
          {isAdmin && (
            <MenuItem
              icon={<FolderOpenOutlined />}
              active={isActive("/asc-folder")}
              onClick={() => navigate("/asc-folder")}
              className="sidebar-menu-item"
            >
              ASC-FOLDER
            </MenuItem>
          )}
        </Menu>
      </div>
    </Sidebar>
  );
};

export default ProSideBar;
