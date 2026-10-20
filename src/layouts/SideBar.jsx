import React, { useState, useEffect, useRef, useTransition } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import "../styles/SideBar.css";
import { Layout, Menu, Tooltip } from "antd";
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
import useDeviceType from "../layouts/useDeviceType";
import toast from "../components/notification/CustomToast";
import { FinIcon } from "../components/customSVG/CustomSVG";

const SideBar = () => {
  const router = useRouter();
  const path = usePathname();
  const deviceType = useDeviceType(); // Store device type in a variable.
  const isWebView = deviceType === "webView";
  const isMobileView = deviceType === "mobileView";
  const isTabView = deviceType === "tabView";

  const userImage = localStorage.getItem("userImage");
  const userid = localStorage.getItem("userid");
  const userLoginData = JSON.parse(localStorage.getItem("userLoginData"));
  const isAdmin = process.env.NEXT_PUBLIC_ADMIN === userid;

  const isSidebarOpenRes = useSelector((state) => state.user.isSidebarOpenRes);

  const { Sider, Content } = Layout;
  const [sideBarOpen, setSideBarOpen] = useState(true);

  const toggleCollapse = () => {
    setSideBarOpen(!sideBarOpen);
  };

  useEffect(() => {
    if (Object.keys(isSidebarOpenRes).length > 0) {
      setSideBarOpen(isSidebarOpenRes?.isSidebarOpen);
    }
  }, [isSidebarOpenRes]);

  // Determine selected menu item based on path
  const selectedKey = (() => {
    if (path === "/dashboard") return "1";
    if (path.startsWith("/profile")) return "2";
    if (
      path === "/teams" ||
      path.startsWith("/teams/")
      // path.endsWith("/edit")
    )
      return "3-1";
    if (path === "/users") return "3-2";

    if (path === "/products" || path.startsWith("/product/")) return "4-1";
    if (path === "/stocks") return "4-2";

    if (path.startsWith("/suppliers")) return "5-1";

    if (path.startsWith("/report")) return "6";
    if (path.startsWith("/task")) return "7";
    if (path === "/scanner") return "8";
    if (path === "/settings") return "100";
    if (path === "/asc-folder") return "110";
    return "";
  })();

  // Set openKeys based on the current route
  const [openKeys, setOpenKeys] = useState([]);

  useEffect(() => {
    if (selectedKey.startsWith("3")) {
      setOpenKeys(["3"]); // Open Workspace submenu
    } else if (selectedKey.startsWith("4")) {
      setOpenKeys(["4"]); // Open Inventory submenu
    } else if (selectedKey.startsWith("5")) {
      setOpenKeys(["5"]); // Open Purchasing submenu
    } else {
      setOpenKeys([]); // Close all other submenus
    }
  }, [selectedKey]);

  const [isPending, startTransition] = useTransition();

  // menu items below👇
  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "DashBoard",
      className: "ripple custom-class",
      onClick: () => router.push("/dashboard"),
    },

    {
      key: "2",
      // icon: <IdcardOutlined />,
      // icon: <ContactsOutlined />,
      // icon: <img src={userImage} width={25} className="rounded-full" />,
      icon: userImage ? (
        <img
          src={userImage}
          className="w-6.25 h-6.25 rounded-full object-cover"
        />
      ) : (
        <ContactsOutlined />
      ),
      // label: "Profile",
      label: (
        <div className="flex flex-col leading-[18px]">
          <span>Profile</span>
          <span className="text-xs" title={userLoginData?.email}>
            {userLoginData?.email}
          </span>
        </div>
      ),
      className: "ripple absolute! bottom-3 ps-3.25!",
      onClick: () => router.push(`/profile/${userid}`),
    },

    {
      key: "3",
      icon: <UsergroupAddOutlined />,
      label: "Workspace",
      onTitleClick: () => {
        setTimeout(() => router.push("/teams"), 200);
      },
      children: [
        {
          key: "3-1",
          // icon: <UsergroupAddOutlined />,
          label: "Teams",
          className: "ripple",
          onClick: () => router.push("/teams"),
        },
        {
          key: "3-2",
          // icon: <UserSwitchOutlined />,
          label: "Users",
          className: "ripple",
          onClick: () => router.push("/users"),
        },
      ],
    },

    {
      key: "4",
      icon: <AppstoreOutlined />,
      label: "Inventory",
      onTitleClick: () => {
        setTimeout(() => router.push("/products"), 200);
      },
      children: [
        {
          key: "4-1",
          // icon: <UsergroupAddOutlined />,
          label: "Products",
          className: "ripple",
          onClick: () => router.push("/products"),
        },

        {
          key: "4-2",
          // icon: <UsergroupAddOutlined />,
          label: "Stock Levels",
          className: "ripple",
          onClick: () => router.push("/stocks"),
        },
      ],
    },

    {
      key: "5",
      icon: <SolutionOutlined />,
      label: "Purchasing",
      // disabled: true,
      onTitleClick: () => {
        setTimeout(() => router.push("/suppliers"), 200);
        startTransition(() => {
          // router.push("/suppliers");
        });
      },
      children: [
        {
          key: "5-1",
          // icon: <UsergroupAddOutlined />,
          label: "Suppliers",
          className: "ripple",
          onClick: () => router.push("/suppliers"),
        },
      ],
    },

    {
      key: "6",
      icon: <BarChartOutlined />,
      label: "Report",
      className: "ripple",
      // disabled: true,
      // onClick: () => router.push("/report"),
      onClick: () => {
        toast.info({
          description: `Reports module is under development.`,
        });
      },
    },

    {
      key: "7",
      icon: <ScheduleOutlined />,
      label: "Tasks",
      className: "ripple",
      onClick: () => router.push("/task"),
    },

    {
      key: "8",
      icon: <ScanOutlined />,
      label: "Scanner",
      className: "ripple",
      onClick: () => router.push("/scanner"),
    },

    {
      key: "100",
      icon: <SettingOutlined spin style={{ animationDuration: "3s" }} />,
      label: "Settings",
      className: "ripple absolute! bottom-15!",
      onClick: () => router.push("/settings"),
    },

    isAdmin && {
      key: "110",
      icon: <FolderOpenOutlined />,
      label: "ASC-FOLDER",
      className: "ripple hidden!",
      onClick: () => router.push("/asc-folder"),
    },
  ];

  if (isMobileView || isTabView) {
    return null;
  }

  let sideBarHeight = sideBarOpen ? 190 : 230;

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
          flex: "none",
          background: "var(--bg)",
          display: isMobileView || isTabView ? "none" : "block",
        }}
      >
        <Sider
          id="asc_Sidebar"
          width={200}
          trigger={null}
          collapsible
          collapsed={!sideBarOpen}
          className="p-"
          style={{
            position: "sticky",
            height: "100vh",
            // overflow: "auto",
            overflow: "visible",
            top: 0,
            bottom: 0,
            scrollbarWidth: "thin",
            scrollbarGutter: "stable",
            background: "var(--bg)",
            // boxShadow: "var(--my-shadow)",
            borderRight: "1px solid #dee2e6",
          }}
        >
          <div
            className={`relative pt-6.5 pb-2 flex flex-wrap justify-center items-center ${sideBarOpen ? "gap-2" : "gap-0 mt-2.5"}`}
          >
            <div className="pointer">
              <p
                className="text-[16px] text-(--badge-bg) font-semibold flex justify-center"
                onClick={() => {
                  router.push("/dashboard");
                }}
              >
                {/* <img src="/fin.png" className="w-7.5 h-6" /> */}
                <FinIcon />
                Avion
              </p>
            </div>

            <div
              className=""
              onClick={() => {
                toggleCollapse();
              }}
            >
              <Hamburger
                toggled={!sideBarOpen}
                // toggle={setSideBarOpen}
                toggle={() => {
                  // toggleCollapse();
                }}
                size={18}
                color="var(--badge-bg)"
              />
            </div>

            <div
              className="pointer hidden"
              onClick={() => {
                toggleCollapse();
              }}
            >
              {sideBarOpen ? (
                <MenuFoldOutlined className="text-(--badge-bg)! absolute top-9 -right-2" />
              ) : (
                <MenuUnfoldOutlined className="text-(--badge-bg)! absolute top-9 -right-2" />
              )}
            </div>
          </div>

          <div
            style={{
              // Adjust according to logo/header height.
              // and if do not want scrollbar in only menu items then remove height and overflow then it will take scrollbar in full sidebar.
              // height: "calc(100vh - 120px)",
              height: `calc(100vh - ${sideBarHeight}px)`,
              overflowY: "auto",
              scrollbarWidth: "thin",
              scrollbarGutter: "stable",
            }}
          >
            <Menu
              theme="light"
              mode="inline"
              selectedKeys={[selectedKey]}
              openKeys={openKeys}
              onOpenChange={(keys) => setOpenKeys(keys)}
              // style={{ background: "#f3faf7", border: "none" }}
              style={{ background: "var(--bg)", border: "none" }}
              items={menuItems}
            />
          </div>
        </Sider>
      </Layout>
    </>
  );
};

export default SideBar;
