"use client";
import React, { useEffect, useState } from "react";
import { clearToken } from "@/src/app/actions/auth";
import { useRouter, usePathname } from "next/navigation";
import NextImage from "next/image";
import Link from "next/link";
import "./Header.css";
import searchicon from "@/src/assets/icons/search.svg";
import warningImg from "@/src/assets/icons/warning.svg";
import moment from "moment";
import Drawer from "./Drawer";
import { Image, Popover, Tooltip, Dropdown, Skeleton } from "antd";
import ProductsCategory from "@/src/app/(protected)/products/ProductsCategory";
import Carts from "@/src/app/(protected)/products/Carts";
import useDeviceType from "./useDeviceType";
import {
  UserOutlined,
  RightOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  LogoutOutlined,
  MoonOutlined,
} from "@ant-design/icons";
import {
  Crown,
  ShieldCheck,
  CircleUserRound,
  CircleUser,
  Eye,
  Palette,
} from "lucide-react";

import toast from "@/src/components/notification/CustomToast";
import { sidebar_Props_API } from "@/src/redux/actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import { BigImageAvatar } from "@/src/components/common/ImageAvatar";
import { BigInitialAvatar } from "@/src/components/common/InitialAvatar";
import HeaderTimer from "@/src/timer/HeaderTimer";
import DayNightToggle from "@/src/theme/DayNightToggle";
// import HangingLamp from "@/src/settings/HangingLamp";
import { useTranslation } from "react-i18next";

const Header = (props) => {
  const showProductsCategory = props?.showProductsCategory ?? true;
  const router = useRouter();
  const dispatch = useDispatch();
  const path = usePathname();
  console.log("path", path);
  const deviceType = useDeviceType();

  const isWebView = deviceType === "webView";
  const isMobileView = deviceType === "mobileView";
  const isTabView = deviceType === "tabView";

  const { t, i18n } = useTranslation();

  const userid = localStorage.getItem("userid");

  const today = new Date();
  const formatedDate = moment(today).format("DD.MMM.YYYY");
  // Get the ISO Current Weeks Number 👇
  const weekNumber = moment().isoWeek();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const dayOfMonth = today.getDate();
  const dayOfWeek = today.getDay();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();
  const milliseconds = today.getMilliseconds();
  const timeStamp = new Date().toISOString();

  // Get the ISO Current Weeks Dates 👇
  const currentWeekStartDate = moment().startOf("week").format("DD-MM-YYYY");
  const currentWeekEndDate = moment().endOf("week").format("DD-MM-YYYY");

  console.log("dates:", formatedDate);

  // const authentication = localStorage.getItem("userLoginData");
  const timerRunning2 = localStorage.getItem("timerRunning");
  console.log("timerRunning2", timerRunning2);

  const setTimerPropsApiRes = useSelector(
    (state) => state.product.setTimerPropsApiRes,
  );
  const updateUserByIdRes = useSelector(
    (state) => state.user.updateUserByIdRes,
  );

  const [authentication, setAuthentication] = useState(
    localStorage.getItem("userLoginData"),
  );

  const [query, setQuery] = useState("");
  const [timerRunning, setTimerRunning] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);
  const [sideBarOpen, setSideBarOpen] = useState(true);

  console.log("header props:", props);

  useEffect(() => {
    setTimeout(() => {
      setAuthentication(localStorage.getItem("userLoginData"));
    }, 1000);
  }, [updateUserByIdRes]);

  useEffect(() => {
    if (setTimerPropsApiRes) {
      console.log("timer props api res", setTimerPropsApiRes);
      setTimerRunning(setTimerPropsApiRes.isRunning);
    }
  }, [setTimerPropsApiRes]);

  const handleLogOut = () => {
    if (timerRunning) {
      return toast.error({
        description: `Can not logout your Timer is running`,
      });
    }
    // if not timer running then proceed with clear all👇
    clearToken();
    sessionStorage.clear();
    localStorage.clear();
    router.push("/");
  };

  const roleIcons2 = (role = "") => {
    if (role.includes("Owner")) return <Crown size={18} color="#D4AF37" />;
    if (role.includes("Manager"))
      return <ShieldCheck size={18} color="#3B82F6" />;
    if (role.includes("User"))
      return <CircleUserRound size={18} color="#06B6D4" />;
    if (role.includes("Viewer")) return <Eye size={18} color="#8B5CF6" />;
    return null;
  };

  const roleIcons = (role = "") => {
    if (role.includes("Owner"))
      return <Crown className="w-4.5 h-4.5 text-amber-600" />;
    if (role.includes("Manager"))
      return <ShieldCheck className="w-4.5 h-4.5 text-emerald-700" />;
    if (role.includes("User"))
      return <CircleUserRound className="w-4.5 h-4.5 text-sky-700" />;
    if (role.includes("Viewer"))
      return <Eye className="w-4.5 h-4.5 text-blue-500" />;
    return null;
  };

  const birthday = JSON.parse(authentication)?.dateOfBirth;
  const isBirthdayToday2 =
    birthday && moment(birthday).format("MM-DD") === moment().format("MM-DD");
  const isBirthdayToday = JSON.parse(authentication)?.isAdmin2;

  const toggleCollapse = () => {
    const newState = !sideBarOpen;
    setSideBarOpen(newState);

    dispatch(
      sidebar_Props_API({
        isSidebarOpen: newState,
        isSidebarOpen2: "asc data",
      }),
    );
  };

  return (
    <div>
      {authentication ? (
        <>
          {/* for timer start */}
          <div>
            <HeaderTimer />
          </div>
          {/* for timer end */}

          {/* Hanging Lamp */}
          {/* <div className="sidebar-lamp absolute top-0 left-[50%] hidden">
            <HangingLamp />
          </div> */}

          <div className="headerMainDiv px-0 sm:px-2 pt-">
            <div className={isMobileView || isTabView ? "" : "hidden"}>
              <Drawer />
            </div>

            <div
              className={
                isMobileView ? "hidden" : "flex flex-wrap gap-5 items-center"
              }
            >
              <div
                className="pointer hidden"
                onClick={() => {
                  toggleCollapse();
                }}
              >
                {sideBarOpen ? (
                  <MenuUnfoldOutlined className="text-(--badge-bg)!" />
                ) : (
                  <MenuFoldOutlined className="text-(--badge-bg)!" />
                )}
              </div>

              <p
                className={
                  path === "/dashboard" ? "selectedOption" : "txtDacoration"
                }
                onClick={() => {
                  router.push("/dashboard");
                }}
              >
                {t("Dashboard")}
              </p>

              <p
                className={
                  path === "/users" ? "selectedOption" : "txtDacoration"
                }
                onClick={() => {
                  router.push("/users");
                }}
              >
                {t("Users")}
              </p>

              <p
                className={
                  path === "/suppliers" ? "selectedOption" : "txtDacoration"
                }
                onClick={() => {
                  router.push("/suppliers");
                }}
              >
                {t("Suppliers")}
              </p>

              <p
                className={
                  path.startsWith("/profile")
                    ? "selectedOption"
                    : "txtDacoration"
                }
                onClick={() => {
                  router.push(`/profile/${userid}`);
                }}
              >
                {t("Profile")}
              </p>
            </div>

            {/* left component start */}
            <div className="flex-gro-w">
              {/* {props.leftComponent && props.leftComponent} */}
            </div>
            {/* left component end */}

            <div className="flex-grow relative">
              <NextImage
                src={searchicon}
                width={15}
                height={15}
                className="ascSearchicon absolute top-3 left-3"
                alt="Search Icon"
              />
              <input
                type="text"
                // autoFocus={true}
                className="commanSearchBox text-[14px] p-2 ps-10"
                placeholder={props.placeholder || "Search..."}
                value={props.query}
                onChange={(e) => {
                  props.setQuery(e.target.value);
                }}
              />
            </div>

            <div className="flex flex-wrap items-center align-middle gap-5 ms-auto">
              <div className="userHeaderInfo">
                {/* <p>{moment(new Date()).format("dddd")}</p> */}
                <p className="mb-0">
                  {moment(new Date()).format("dddd-DD-MMM-YYYY")}
                </p>

                <p className="mb-0 flex gap-2 items-center">
                  {JSON.parse(authentication)?.firstName} {""}
                  {JSON.parse(authentication)?.lastName} {""}
                  {roleIcons(JSON.parse(authentication)?.role)}
                  <span className="text-sm">
                    {JSON.parse(authentication)?.role.slice(4)}
                  </span>
                </p>
              </div>

              <Popover
                title=""
                trigger="click"
                arrow={false}
                placement="bottomLeft"
                classNames={{
                  root: "w-[300px]! shadow-xl rounded-xl!",
                  container: "bg-(--popup-bg)! rounded-xl!",
                  content: "",
                }}
                content={
                  <div className="userPopupInfo">
                    <div className="flex gap-5 items-center text-[16px]! pt-1 ps-2 bg-(--popup-highlight) rounded-lg">
                      {JSON.parse(authentication)?.image ? (
                        <BigImageAvatar
                          className=""
                          image={JSON.parse(authentication)?.image}
                        />
                      ) : (
                        <BigInitialAvatar
                          firstName={JSON.parse(authentication)?.firstName}
                          lastName={JSON.parse(authentication)?.lastName}
                          style={{ width: "70px", height: "70px" }}
                        />
                      )}

                      <div className="text-[#808080] font-medium">
                        <div className="flex gap-1 items-center ">
                          <p>{JSON.parse(authentication)?.firstName}</p>
                          <p>{JSON.parse(authentication)?.lastName}</p>
                        </div>
                        <p className="text-[14px]! flex gap-2">
                          {roleIcons(JSON.parse(authentication)?.role)}
                          <span className="text-sm">
                            {JSON.parse(authentication)?.role.slice(4)}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div
                      className="mt-2 flex gap-4 ps-4 py-3 hover:bg-(--popup-highlight) rounded-lg group"
                      style={{
                        background: path.includes("profile")
                          ? "var(--popup-highlight)"
                          : "",
                      }}
                      onClick={() => {
                        router.push(`/profile/${userid}`);
                      }}
                    >
                      <UserOutlined className="" />
                      <p className="text-sm">My Profile</p>
                      <RightOutlined className="ms-auto pe-3 duration-300 group-hover:translate-x-2" />
                    </div>

                    <p className="borderBottom my-2"></p>
                    <p className="ps-4">
                      <span>
                        <MailOutlined className="" />
                      </span>
                      <span className="ps-4">
                        {JSON.parse(authentication)?.email}
                      </span>
                    </p>

                    <p className="ps-4 pt-2">
                      <span>
                        <PhoneOutlined rotate={100} className="" />
                      </span>
                      <span className="ps-4">
                        {JSON.parse(authentication)?.phoneNumber}
                      </span>
                    </p>

                    <p className="borderBottom my-2"></p>
                    <p className="ps-4 text-sm">
                      <span>
                        <CalendarOutlined />
                      </span>
                      <span className="ps-4">{`Created:`}</span>
                      <span className="ps-15">
                        {moment(JSON.parse(authentication)?.createdAt).format(
                          "DD-MMM-YYYY",
                        )}
                      </span>
                    </p>

                    <p className="ps-4 pt-2 text-sm">
                      <span>
                        <ClockCircleOutlined />
                      </span>
                      <span className="ps-4 ">{`Last Updated:`}</span>
                      <span className="ps-7">
                        {moment(JSON.parse(authentication)?.updatedAt).format(
                          "DD-MMM-YYYY",
                        )}
                      </span>
                    </p>

                    <p className="borderBottom my-2 hidden"></p>
                    <p className="ps-4 text-sm py-1 hidden">
                      <span>
                        <MoonOutlined />
                      </span>
                      <span className="ps-4 ">Dark Mode</span>
                      <span className="ps-22">
                        <DayNightToggle />
                      </span>
                    </p>

                    <p className="borderBottom my-2"></p>
                    <p
                      className="text-red-400 hover:text-red-500 ps-4 py-1 max-w-fit"
                      onClick={() => {
                        // sessionStorage.clear();
                        // localStorage.clear();
                        // router.push("/");
                        handleLogOut();
                      }}
                    >
                      <span>
                        <LogoutOutlined />
                      </span>
                      <span className="ps-4">Log Out</span>
                    </p>
                  </div>
                }
              >
                <div className="relative">
                  {isBirthdayToday && (
                    <NextImage
                      src="/circle-waves.gif"
                      alt=""
                      width={95}
                      height={140}
                      aria-hidden="true"
                      className="birthDayGif"
                    />
                  )}

                  {JSON.parse(authentication)?.image ? (
                    // <BigImageAvatar
                    //   className="userImg"
                    //   image={JSON.parse(authentication)?.image}
                    // />
                    <>
                      {imgLoading && (
                        <Skeleton.Avatar active shape="circle" size={70} />
                      )}
                      <NextImage
                        src={JSON.parse(authentication)?.image}
                        alt=""
                        className="userImg pointer relative" // relative for birthDayGif animation
                        width={70}
                        height={70}
                        onLoad={() => setImgLoading(false)}
                        onError={(e) => {
                          // e.target.src = "any img url";
                          e.target.src = warningImg;
                          setImgLoading(false);
                        }}
                        style={{ display: imgLoading ? "none" : "block" }}
                      />
                    </>
                  ) : (
                    <span className="pointer">
                      <BigInitialAvatar
                        firstName={JSON.parse(authentication)?.firstName}
                        lastName={JSON.parse(authentication)?.lastName}
                        style={{ width: "70px", height: "70px" }}
                      />
                    </span>
                  )}
                </div>
              </Popover>
            </div>
          </div>

          {showProductsCategory && (
            <div className="flex flex-wrap-reverse justify-center sm:justify-between pt-5 px-3 sm:px-2">
              <div className="pt-1">
                <ProductsCategory />
              </div>
              <div className="sm:ms-auto">
                <Carts />
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-wrap justify-end gap-4 pt-4 pe-5">
          <Link
            href="/signup"
            className={path === "/signu-p" ? "withUnderLine" : "txtDacoration"}
          >
            Signup
          </Link>

          <Link
            href="/"
            className={path === "/-" ? "withUnderLine" : "txtDacoration"}
          >
            Login
          </Link>

          <div // for smooth underline.
            className="withUnderLineAnima"
            style={{
              // display: path === "/" || path === "/signup" ? "block" : "none",
              display: ["/", "/signup"].includes(path) ? "block" : "none",
              right: path === "/" ? "35px" : path === "/signup" ? "115px" : "",
              top: "60px",
              width: "75px",
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Header;
