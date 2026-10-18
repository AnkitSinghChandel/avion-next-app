"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import NextImage from "next/image";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import "./UserList.css";
import useClickOutside from "@/src/hooks/useClickOutside";
import Header from "@/src/layouts/Header";
import Footer from "@/src/layouts/Footer";
import WarningPopup from "@/src/components/dialogs/WarningPopup";
import { Tooltip, Empty, Skeleton, Tag } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  FilePdfOutlined,
  SyncOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";

import { fetchAllUsers } from "@/src/redux/actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { BigImageAvatar } from "@/src/components/common/ImageAvatar";
import { BigInitialAvatar } from "@/src/components/common/InitialAvatar";
import CurrentWeekDates from "@/src/components/datePicker/CurrentWeekDates";
import toast from "@/src/components/notification/CustomToast";
import NoData from "@/src/components/common/NoData";
import BarcodeGenerator from "@/src/components/Barcode/BarcodeGenerator";

const UsersList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const SearchInputRef = useRef(null);
  const [Ankit] = useAutoAnimate();
  const popupRef = useRef(null);

  const fetchAllUsersRes = useSelector((state) => state.user.fetchAllUsersRes);

  console.log("asc23", fetchAllUsersRes);

  const [userListData, setUserListData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [orderBy, setOrderBy] = useState();
  const [apimessage, setApimessage] = useState("");
  const [searchBorderShow, setSearchBorderShow] = useState(false);
  const [arrowOptionsRotate, setArrowOptionsRotate] = useState(false);

  const [selectedSortShow, setSelectedSortShow] = useState(false);
  const [selectedSort, setSelectedSort] = useState("");
  const [loading, setLoading] = useState(true);

  // asc cancel popup start
  const [cancelPopupShow, setCancelPopupShow] = useState(false);
  const handleClose = () => setCancelPopupShow(false);

  const handleYes = () => {
    router.back();
  };
  const [typeInScreen, setTypeInScreen] = useState("");
  // asc cancel popup end

  useEffect(() => {
    // dispatch(TeamsGeneratePDF());
  }, []);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  useEffect(() => {
    if (fetchAllUsersRes.status === true) {
      // setUserListData(fetchAllUsersRes.data);
      const loginUserId = localStorage.getItem("userid");
      const sortedData = [...fetchAllUsersRes.data].sort((a, b) => {
        if (a.userId === loginUserId) return -1; // a top pe
        if (b.userId === loginUserId) return 1; // b top pe
        return 0; // baki same order
      });

      setUserListData(sortedData);
      setLoading(false);
    }
    if (fetchAllUsersRes.status === false) {
      setUserListData(fetchAllUsersRes.data);
      setApimessage(fetchAllUsersRes?.message || "Failed to fetch users data.");
      setLoading(false);
    }
  }, [fetchAllUsersRes]);

  // in desktop right click work and in mobile longpress work.
  let timer;

  const openMenu = (e, item) => {
    e.preventDefault();
    setPopupOpen(true);
    setUserId(item.userId);
  };

  const startLongPress = (item) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      setPopupOpen(true);
      setUserId(item.userId);
    }, 500);
  };

  const cancelLongPress = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  // Call the custom hook to handle click outside 👇
  useClickOutside(popupRef, () => {
    setPopupOpen(false);
    setArrowOptionsRotate(false);
  });

  return (
    <div className="">
      <Header
        setQuery={setSearchValue}
        placeholder={"Search..."}
        leftComponent={
          <div className="leftComponentCss">
            <p className="text-[#5CAF90] font-medium text-[18px]">
              {/* You are in Products list */}
            </p>
          </div>
        }
      />

      {loading &&
        Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={index}
            avatar
            active
            round
            title={{ width: "100%" }}
            paragraph={{ rows: 1, width: "150px" }}
            className="pt-8"
          />
        ))}

      <div className="pt-5">
        {userListData
          ?.filter(
            (x) =>
              x.firstName?.toLowerCase().includes(searchValue.toLowerCase()) ||
              x.lastName?.toLowerCase().includes(searchValue.toLowerCase()) ||
              x.phoneNumber?.toLowerCase().includes(searchValue.toLowerCase()),
          )
          ?.map((item, index) => {
            return (
              <div
                key={item.userId}
                className="usermaindiv flex flex-wrap justify-between items-center gap-5 my-3 p-3 relative"
                onContextMenu-2={(e) => {
                  e.preventDefault();
                  setPopupOpen(true);
                  setUserId(item.userId);
                }}
                onContextMenu={(e) => openMenu(e, item)}
                onTouchStart={() => startLongPress(item)}
                onTouchEnd={cancelLongPress}
                onTouchCancel={cancelLongPress}
                onTouchMove={cancelLongPress}
              >
                {popupOpen && userId === item.userId && (
                  <p className="absolute -top-3.75" ref={popupRef}>
                    <Tag
                      color="#16a34a"
                      className="rounded-4xl font-semibold px-1 py-2"
                    >
                      Active User
                    </Tag>
                  </p>
                )}

                <div className="flex items-center gap-5 w-[390px] max-w-full">
                  <div className="relative">
                    {item?.isAdmin2 && (
                      <NextImage
                        src="/circle-waves.gif"
                        alt=""
                        aria-hidden="true"
                        width={95}
                        height={140}
                        className="absolute birthDayGif"
                      />
                    )}

                    {item?.image ? (
                      <BigImageAvatar
                        className="rounded-full object-cover w-[70px] h-[70px]"
                        image={item.image}
                      />
                    ) : (
                      <BigInitialAvatar
                        firstName={item?.firstName}
                        lastName={item?.lastName}
                        style={{ width: "70px", height: "70px" }}
                      />
                    )}
                  </div>

                  <div className="usernamediv">
                    <p>
                      {item.firstName} {item.lastName} {""} {item.phoneNumber}
                    </p>
                    <p>{moment(item.createdAt).format("DD-MMM-YYYY")}</p>
                  </div>
                </div>

                <div className="min-w-50 max-w-full flex-1 sm:flex-none">
                  <BarcodeGenerator
                    textValue={`BC${item.userId.slice(0, 8)}`}
                  />
                </div>

                <div className="ms-auto min-w-25 text-center me-5">
                  <div className="roleDiv">
                    {item?.isAdmin ? (
                      <p className="font-bold">Admin</p>
                    ) : (
                      item.role.slice(4)
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        {/* Display a message when no search are found */}
        <NoData
          listData={userListData}
          searchValue={searchValue}
          filterParameters={userListData.map(
            (x) => `${x.firstName} ${x.lastName} ${x.phoneNumber}`,
          )}
        />
      </div>
      <Footer visibilityHeight={100} />
    </div>
  );
};

export default UsersList;
