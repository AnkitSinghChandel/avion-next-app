import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LeftCircleOutlined,
  RightCircleOutlined,
  DownOutlined,
  UserOutlined,
  UserAddOutlined,
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
import { Collapse } from "antd";
import "../styles/SideBar2.css";
import Hamburger from "hamburger-react";
import useDeviceType from "../layouts/useDeviceType";
import toast from "../components/notification/CustomToast";
import { FinIcon } from "../components/customSVG/CustomSVG";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const SideBar = () => {
  const router = useRouter();
  const path = usePathname();
  const deviceType = useDeviceType(); // Store device type in a variable.
  const isWebView = deviceType === "webView";
  const isMobileView = deviceType === "mobileView";
  const isTabView = deviceType === "tabView";
  const [Ankit] = useAutoAnimate();

  const userid = localStorage.getItem("userid");
  const isAdmin = process.env.NEXT_PUBLIC_ADMIN === userid;

  // const isSidebarOpenRes = useSelector((state) => state.user.isSidebarOpenRes);

  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [openMenu, setOpenMenu] = useState({});
  const [teamsOpen, setTeamsOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [suppliersOpen, setSuppliersOpen] = useState(false);

  useEffect(() => {
    if (path.startsWith("/teams") || path.startsWith("/users")) {
      setOpenMenu({ menu1: true });
    } else if (
      path.startsWith("/products") ||
      path.startsWith("/stock-levels")
    ) {
      setOpenMenu({ menu2: true });
    } else if (path.startsWith("/suppliers")) {
      setOpenMenu({ menu3: true });
    }
  }, [path]);

  if (isMobileView || isTabView) {
    return null;
  }

  return (
    <div>
      <div
        className={`sidebar-main-div pe-0 pt-5 z-50 duration-300 
        ${sideBarOpen ? "w-50" : "w-24"}`}
      >
        {/* Header section start */}
        <div>
          {/* Toggle Btn */}
          <button
            onClick={() => setSideBarOpen(!sideBarOpen)}
            className="sidebar-toggle-btn pointer hidden"
          >
            {sideBarOpen ? <LeftCircleOutlined /> : <RightCircleOutlined />}
          </button>

          <h1
            className={`sidebar-header mb-5 duration-200 hidden ${
              !sideBarOpen && "scale-0"
            }`}
          >
            Admin Panel
          </h1>

          <div
            className={`relative pb-2 flex flex-wrap justify-center items-center ${sideBarOpen ? "gap-2 pt-2" : "gap-0 pt-4.5"}`}
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
              className="hidde-n"
              onClick={() => {
                // toggleCollapse();
                setSideBarOpen(!sideBarOpen);
              }}
            >
              <Hamburger
                toggled={!sideBarOpen}
                // toggle={setSideBarOpen}
                toggle={() => setSideBarOpen((pre) => !pre)}
                size={18}
                color="var(--badge-bg)"
              />
            </div>
          </div>
        </div>
        {/* Header section end */}

        <div
          className="space-y-2 px-1 pb-2"
          style={{
            height: sideBarOpen ? "calc(100vh - 100px)" : "calc(100vh - 140px)",
            overflowY: "auto",
            overflowX: "hidden",
            // scrollbarWidth: "thin",
          }}
        >
          <p className={`sidebar-category ${!sideBarOpen && "scale-0 hidden"}`}>
            Overview
          </p>

          {/* ========= Dashboard option ========= */}
          <div>
            <Link
              hef="/dashboard"
              className={({ isActive }) => {
                return `sidebar-option ripple ${isActive ? "selected-sidebar" : ""}`;
              }}
              onClick={() => setOpenMenu({})}
            >
              <div
                className={`flex gap-2 duration-500 ${sideBarOpen ? "ps-5" : "m-auto"}`}
              >
                <DashboardOutlined />
                {sideBarOpen ? "Dashboard" : ""}
              </div>
            </Link>
          </div>

          {/* ========= Profile option ========= */}
          <div>
            <Link
              href={`/profile/${userid}`}
              className={`sidebar-option ripple ${
                path === "/profile" ? "selected-sidebar" : ""
              }`}
              onClick={() => setOpenMenu({})}
            >
              <div
                className={`flex gap-2 duration-500 ${sideBarOpen ? "ps-5" : "m-auto"}`}
              >
                <ContactsOutlined />
                {sideBarOpen ? "Profile" : ""}
              </div>
            </Link>
          </div>

          <p className={`sidebar-category ${!sideBarOpen && "scale-0 hidden"}`}>
            Management
          </p>

          <Collapse
            accordion
            ghost
            // showArrow={false}
            bordered={false}
            activeKey={openMenu}
            onChange={(key) => setOpenMenu(key)}
            expandIconPlacement="end"
            className="hidden"
            items={[
              // Teams Parent
              {
                key: "menu1",
                label: (
                  <div className="flex items-center gap-2">
                    <UsergroupAddOutlined />
                    {sideBarOpen && "Teams"}
                  </div>
                ),
                className: "sidebar-collapse-item !",
                classNames: {
                  header: "my-collapse-header",
                  body: "my-collapse-body p-1!",
                },
                children: (
                  <div className="space-y-1">
                    <Link
                      href="/teams"
                      end
                      className={({ isActive }) => {
                        return `sidebar-option ps-3 ripple ${
                          isActive ? "selected-sidebar" : ""
                        }`;
                      }}
                    >
                      <UserOutlined />
                      {sideBarOpen ? "Teams" : "T"}
                    </Link>

                    <Link
                      href="/teams/create"
                      end
                      className={({ isActive }) => {
                        return `sidebar-option ps-3 ripple ${
                          isActive ? "selected-sidebar" : ""
                        }`;
                      }}
                    >
                      Add Team
                    </Link>
                  </div>
                ),
              },

              // Products Parent
              {
                key: "menu2",
                label: (
                  <div className="flex items-center gap-2">
                    <AppstoreOutlined />
                    {sideBarOpen && "Products"}
                  </div>
                ),
                className: "sidebar-collapse-item",
                classNames: {
                  header: "my-collapse-header",
                  body: "my-collapse-body p-1!",
                },
                children: (
                  <div className="space-y-1">
                    <Link
                      href="/products"
                      end
                      className={({ isActive }) => {
                        return `sidebar-option ps-3 ripple ${
                          isActive ? "selected-sidebar" : ""
                        }`;
                      }}
                    >
                      Products
                    </Link>

                    <Link
                      href="/products/create"
                      end
                      className={({ isActive }) => {
                        return `sidebar-option ps-3 ripple ${
                          isActive ? "selected-sidebar" : ""
                        }`;
                      }}
                    >
                      Add Products
                    </Link>
                  </div>
                ),
              },

              // Suppliers Parent
              {
                key: "menu3",
                label: (
                  <div className="flex items-center gap-2">
                    <SolutionOutlined />
                    {sideBarOpen && "Suppliers"}
                  </div>
                ),
                className: "sidebar-collapse-item",
                classNames: {
                  header: "my-collapse-header",
                  body: "my-collapse-body p-1!",
                },
                children: (
                  <div className="space-y-1">
                    <Link
                      href="/suppliers"
                      end
                      className={({ isActive }) => {
                        return `sidebar-option ps-3 ripple ${
                          isActive ? "selected-sidebar" : ""
                        }`;
                      }}
                    >
                      Suppliers
                    </Link>

                    <Link
                      href="/suppliers/create"
                      end
                      className={({ isActive }) => {
                        return `sidebar-option ps-3 ripple ${
                          isActive ? "selected-sidebar" : ""
                        }`;
                      }}
                    >
                      Add Suppliers
                    </Link>
                  </div>
                ),
              },
            ]}
          />

          {/* ========= Workspace parent ========= */}
          <div className="pointer">
            <div
              // onClick={() => setTeamsOpen(!teamsOpen)}
              onClick={() => {
                setOpenMenu((prev) => ({
                  ...prev,
                  menu1: !prev.menu1,
                }));
              }}
              className={`sidebar-option`}
            >
              <div
                className={`flex items-center gap-2 duration-500 w-full ${
                  sideBarOpen ? "ps-5" : "m-auto [display:unset]!"
                }`}
              >
                <UsergroupAddOutlined />
                {sideBarOpen ? "Workspace" : ""}

                <div className="ms-auto me-3">
                  {sideBarOpen && (
                    <DownOutlined
                      className={`w-2.5 duration-400 ease-in-out ${
                        openMenu.menu1 ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* ========= Workspace children options ========= */}
            <div
              className={`duration-500 ${
                sideBarOpen && openMenu.menu1 ? "max-h-40" : "max-h-0 scale-0"
              }`}
            >
              <div className="pl--6 px-1 mt-1 space-y-1 submenu-options">
                <div>
                  <Link
                    href={`/users`}
                    className={({ isActive }) =>
                      `sidebar-option duration-500 ripple ${isActive ? "selected-sidebar" : ""}`
                    }
                    onClick={() => {
                      setOpenMenu({ menu1: true });
                    }}
                  >
                    <div
                      className={`flex gap-2 duration-500 ${sideBarOpen ? "ps-5" : "m-auto"}`}
                    >
                      {/* <UserOutlined /> */}
                      {sideBarOpen ? "Users" : ""}
                    </div>
                  </Link>
                </div>

                <div>
                  <Link
                    href={`/teams`}
                    // end // exact route match
                    className={({ isActive }) =>
                      `sidebar-option duration-500 ripple ${isActive ? "selected-sidebar" : ""}`
                    }
                    onClick={() => {
                      setOpenMenu({ menu1: true });
                    }}
                  >
                    <div
                      className={`flex gap-2 duration-500 ${sideBarOpen ? "ps-5" : "m-auto"}`}
                    >
                      {/* <UserAddOutlined /> */}
                      {sideBarOpen ? "Teams" : ""}
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ========= inventory parent ========= */}
          <div className="pointer">
            <div
              onClick={() => {
                setOpenMenu((prev) => ({
                  ...prev,
                  menu2: !prev.menu2,
                }));
              }}
              className={`sidebar-option`}
            >
              <div
                className={`flex items-center gap-2 duration-500 w-full ${
                  sideBarOpen ? "ps-5" : "m-auto [display:unset]!"
                }`}
              >
                <AppstoreOutlined />
                {sideBarOpen ? "Inventory" : ""}

                <div className="ms-auto me-3">
                  {sideBarOpen && (
                    <DownOutlined
                      className={`w-2.5 duration-400 ease-in-out ${
                        openMenu.menu2 ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* ========= inventory children options ========= */}
            <div
              className={`duration-500 ease-in-out ${
                sideBarOpen && openMenu.menu2 ? "max-h-40" : "max-h-0 scale-y-0"
              }`}
            >
              <div className="pl--6 px-1 mt-1 space-y-1 submenu-options">
                <div>
                  <Link
                    href={`/products`}
                    // end // exact route match
                    className={({ isActive }) => {
                      const isEditPage = path.endsWith("/edit");
                      return `sidebar-option duration-500 ripple ${isActive ? "selected-sidebar" : ""}`;
                    }}
                    onClick={() => {
                      setOpenMenu({ menu2: true });
                    }}
                  >
                    <div
                      className={`flex gap-2 duration-500 ${sideBarOpen ? "ps-5" : "m-auto"}`}
                    >
                      {/* <UserOutlined /> */}
                      {sideBarOpen ? "Products" : ""}
                    </div>
                  </Link>
                </div>

                <div>
                  <Link
                    href="/stock-levels"
                    className={({ isActive }) => {
                      return `sidebar-option ripple ${isActive ? "selected-sidebar" : ""}`;
                    }}
                    onClick={() => {
                      setOpenMenu({ menu2: true });
                    }}
                  >
                    <div
                      className={`flex gap-2 duration-500 ${sideBarOpen ? "ps-5" : "m-auto"}`}
                    >
                      {/* <HddOutlined /> */}
                      {sideBarOpen ? "Stock Levels" : ""}
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ========= purchasing parent ========= */}
          <div className="pointer">
            <div
              onClick={() => {
                setOpenMenu((prev) => ({
                  ...prev,
                  menu3: !prev.menu3,
                }));
              }}
              className={`sidebar-option`}
            >
              <div
                className={`flex items-center gap-2 duration-500 w-full ${
                  sideBarOpen ? "ps-5" : "m-auto [display:unset]!"
                }`}
              >
                <SolutionOutlined />
                {sideBarOpen ? "Purchasing" : ""}

                <div className="ms-auto me-3">
                  {sideBarOpen && (
                    <DownOutlined
                      className={`w-2.5 duration-400 ease-in-out ${
                        openMenu.menu3 ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* ========= purchasing children options ========= */}
            <div
              className={`duration-500 ease-in-out ${
                sideBarOpen && openMenu.menu3 ? "max-h-40" : "max-h-0 scale-y-0"
              }`}
            >
              <div className="pl--6 px-1 mt-1 space-y-1 submenu-options">
                <div>
                  <Link
                    href={`/suppliers`}
                    // end // exact route match
                    className={({ isActive }) => {
                      return `sidebar-option duration-500 ripple ${isActive ? "selected-sidebar" : ""}`;
                    }}
                    onClick={() => {
                      setOpenMenu({ menu3: true });
                    }}
                  >
                    <div
                      className={`flex gap-2 duration-500 ${sideBarOpen ? "ps-5" : "m-auto"}`}
                    >
                      {/* <UserOutlined /> */}
                      {sideBarOpen ? "Suppliers" : ""}
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <p className={`sidebar-category ${!sideBarOpen && "scale-0 hidden"}`}>
            Operations
          </p>

          {/* ========= Report option ========= */}
          <div>
            <Link
              href="#"
              className={({ isActive }) => {
                return `sidebar-option ripple ${isActive ? "selected-sidebar-2" : ""}`;
              }}
              onClick={() => {
                toast.info({
                  description: "Reports module is under development.",
                });
                setOpenMenu({});
              }}
            >
              <div
                className={`flex gap-2 duration-500 ${sideBarOpen ? "ps-5" : "m-auto"}`}
              >
                <BarChartOutlined />
                {sideBarOpen ? "Reports" : ""}
              </div>
            </Link>
          </div>

          {/* ========= Task option ========= */}
          <div>
            <Link
              href="/task"
              className={({ isActive }) => {
                return `sidebar-option ripple ${isActive ? "selected-sidebar" : ""}`;
              }}
              onClick={() => setOpenMenu({})}
            >
              <div
                className={`flex gap-2 duration-500 ${sideBarOpen ? "ps-5" : "m-auto"}`}
              >
                <ScheduleOutlined />
                {sideBarOpen ? "Tasks" : ""}
              </div>
            </Link>
          </div>

          {/* ========= Scanner option ========= */}
          <div>
            <Link
              href="/scanner"
              className={({ isActive }) => {
                return `sidebar-option ripple ${isActive ? "selected-sidebar" : ""}`;
              }}
              onClick={() => setOpenMenu({})}
            >
              <div
                className={`flex gap-2 duration-500 ${sideBarOpen ? "ps-5" : "m-auto"}`}
              >
                <ScanOutlined />
                {sideBarOpen ? "Scanner" : ""}
              </div>
            </Link>
          </div>

          {/* ========= Settings option ========= */}
          <div>
            <Link
              href="/settings"
              className={({ isActive }) => {
                return `sidebar-option ripple ${isActive ? "selected-sidebar" : ""}`;
              }}
              onClick={() => setOpenMenu({})}
            >
              <div
                className={`flex gap-2 duration-500 ${sideBarOpen ? "ps-5" : "m-auto"}`}
              >
                <SettingOutlined spin style={{ animationDuration: "3s" }} />
                {sideBarOpen ? "Settings" : ""}
              </div>
            </Link>
          </div>

          {/* ========= ASC-FOLDER option ========= */}
          {isAdmin && (
            <div>
              <Link
                href="/asc-folder"
                className={({ isActive }) => {
                  return `sidebar-option ripple ${isActive ? "selected-sidebar" : ""}`;
                }}
                onClick={() => setOpenMenu({})}
              >
                <div
                  className={`flex gap-2 duration-500 ${sideBarOpen ? "ps-5" : "m-auto"}`}
                >
                  <FolderOpenOutlined />
                  {sideBarOpen ? "ASC-FOLDER" : ""}
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
