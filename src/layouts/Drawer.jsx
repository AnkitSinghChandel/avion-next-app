import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Drawer, Button } from "antd";
import "../styles/Drawer.css";
import useDeviceType from "./useDeviceType";
import Hamburger from "hamburger-react";
import { Tooltip } from "antd";
import {
  DownOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  DashboardOutlined,
  AppstoreOutlined,
  ScheduleOutlined,
  ScanOutlined,
  HddOutlined,
  ContactsOutlined,
  SolutionOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import DownArrowOption from "../assets/icons/DownArrowOption.svg";
import { FinIcon } from "../components/customSVG/CustomSVG";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const MyDrawer = () => {
  const router = useRouter();
  const path = usePathname();
  console.log("path", path);
  const deviceType = useDeviceType();
  const [Ankit] = useAutoAnimate();

  const userID = localStorage.getItem("userid");
  const userImage = localStorage.getItem("userImage");
  const userLoginData = JSON.parse(localStorage.getItem("userLoginData"));

  const [open, setOpen] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);
  const [openTeams, setOpenTeams] = useState(false);
  const [openSuppliers, setOpenSuppliers] = useState(false);

  return (
    <div>
      <Hamburger
        toggled={open}
        toggle={setOpen}
        size={20}
        color="var(--badge-bg)"
      />

      <Drawer
        title={
          <div className="drawer-title flex gap-4 items-center">
            {/* <img src="/fin.png" className="w-7.5 h-6" /> */}
            <FinIcon />
            <span>Avion</span>
            <span>
              <Hamburger
                toggled={open}
                toggle={setOpen}
                size={20}
                color="var(--badge-bg)"
              />
            </span>
          </div>
        }
        size={250}
        closeIcon={null} // Removes default close button.
        placement="left"
        // mask={false}
        onClose={() => setOpen(false)}
        open={open}
        classNames={{
          header: "custom-header",
          body: "custom-body",
          footer: "custom-footer",
        }}
        styles={{
          body: {
            maxHeight: "calc(100vh - 200px)",
            borderBottom: "1px solid #0505050f",
          },
        }}
        className="custom-drawer"
      >
        <div className="pointer">
          <p
            className={
              path === "/dashboard" ? "drawer-selectedOption" : "optionText"
            }
            onClick={() => {
              router.push("/dashboard");
            }}
          >
            <DashboardOutlined /> DashBoard
          </p>

          <p
            className={
              path.startsWith("/profile")
                ? "drawer-selectedOption"
                : "optionText"
            }
            style={{
              position: "absolute",
              bottom: "15px",
              width: "80%",
              paddingLeft: "4px",
            }}
            onClick={() => {
              router.push(`/profile/${userID}`);
            }}
          >
            {/* <ContactsOutlined /> Profile */}
            {userImage ? (
              <img
                src={userImage}
                alt=""
                className="w-6.25 h-6.25 rounded-full object-cover"
              />
            ) : (
              <ContactsOutlined />
            )}
            <p className="leading-[17px]">
              Profile
              <br />
              <span className="text-xs text-amber-600">
                {userLoginData?.email}
              </span>
            </p>
          </p>

          {/* Workspace section */}
          <div className="pt-1">
            <div
              className={
                path === "/teams" ||
                path === "/teams/create" ||
                (path.startsWith("/teams/") && path.endsWith("/edit")) ||
                path === "/users"
                  ? "drawer-selectedOption flex justify-between"
                  : "optionText flex justify-between"
              }
              onClick={() => {
                setOpenTeams(!openTeams);
              }}
            >
              <div className="flex gap-2.5">
                <UsergroupAddOutlined />
                Workspace
              </div>

              <DownOutlined
                style={{
                  fontSize: "14px",
                  transform: openTeams ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              />
            </div>

            <div className="pb-1" ref={Ankit}>
              {openTeams && (
                <div className="subMenu leading-[10px] p-2 ps-">
                  <p
                    className={
                      path === "/teams" || path.includes("/teams")
                        ? "subMenuSelected"
                        : "optionText"
                    }
                    onClick={() => {
                      router.push("/teams");
                    }}
                  >
                    <span className="submenu-dot"></span>
                    Teams
                  </p>

                  <p className="borderBottom my-1"></p>

                  <p
                    className={
                      path === "/users" ? "drawer-selectedOption" : "optionText"
                    }
                    onClick={() => {
                      router.push("/users");
                    }}
                  >
                    <span className="submenu-dot"></span>
                    Users
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Inventory section */}
          <div className="">
            <div
              className={
                path === "/products" ||
                path === "/products/create" ||
                (path.startsWith("/products/") && path.endsWith("/edit")) ||
                path === "/stock-levels"
                  ? "drawer-selectedOption flex justify-between"
                  : "optionText flex justify-between"
              }
              onClick={() => {
                setOpenProducts(!openProducts);
              }}
            >
              <div className="flex gap-2.5">
                <AppstoreOutlined />
                Inventory
              </div>

              <DownOutlined
                style={{
                  fontSize: "14px",
                  transform: openProducts ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              />
            </div>

            <div className="pb-1" ref={Ankit}>
              {openProducts && (
                <div className="subMenu leading-[10px] p-2 ps-">
                  <p
                    className={
                      path === "/products" || path.includes("/products")
                        ? "subMenuSelected"
                        : "optionText"
                    }
                    onClick={() => {
                      router.push("/products");
                    }}
                  >
                    <span className="submenu-dot"></span>
                    Products
                  </p>

                  <p className="borderBottom my-1"></p>

                  <p
                    className={
                      path === "/stock-levels"
                        ? "drawer-selectedOption"
                        : "optionText"
                    }
                    onClick={() => {
                      router.push("/stock-levels");
                    }}
                  >
                    <span className="submenu-dot"></span>
                    Stock Levels
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Purchasing section */}
          <div className="">
            <div
              className={
                path === "/suppliers" || path.includes("/suppliers")
                  ? "drawer-selectedOption flex justify-between"
                  : "optionText flex justify-between"
              }
              onClick={() => {
                setOpenSuppliers(!openSuppliers);
              }}
            >
              <div className="flex gap-2.5">
                <SolutionOutlined />
                Purchasing
              </div>

              <DownOutlined
                style={{
                  fontSize: "14px",
                  transform: openSuppliers ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              />
            </div>

            <div className="pb-1" ref={Ankit}>
              {openSuppliers && (
                <div className="subMenu leading-[10px] p-2 ps-">
                  <p
                    className={
                      path === "/suppliers" || path.includes("/suppliers")
                        ? "subMenuSelected"
                        : "optionText"
                    }
                    onClick={() => {
                      router.push("/suppliers");
                    }}
                  >
                    <span className="submenu-dot"></span>
                    Suppliers
                  </p>
                </div>
              )}
            </div>
          </div>

          <p
            className={
              path === "/task" ? "drawer-selectedOption" : "optionText"
            }
            onClick={() => {
              router.push("/task");
            }}
          >
            <ScheduleOutlined /> Tasks
          </p>

          <p
            className={
              path === "/scanner" ? "drawer-selectedOption" : "optionText"
            }
            onClick={() => {
              router.push("/scanner");
            }}
          >
            <ScanOutlined /> Scanner
          </p>

          <p
            className={
              path === "/settings" ? "drawer-selectedOption" : "optionText"
            }
            style={{ position: "absolute", bottom: "65px", width: "80%" }}
            onClick={() => {
              router.push("/settings");
            }}
          >
            <SettingOutlined spin style={{ animationDuration: "3s" }} />
            Settings
          </p>
        </div>
      </Drawer>
    </div>
  );
};

export default MyDrawer;
