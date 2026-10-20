"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  useRouter,
  usePathname,
  useParams,
  useSearchParams,
} from "next/navigation";
import NextImage from "next/image";
import "./Profile.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Header from "@/src/layouts/Header";
import WarningPopup from "@/src/components/dialogs/WarningPopup";
import addicon from "@/src/assets/icons/addicon.svg";
import singleUser from "@/src/assets/icons/singleUser.svg";
import ASC22 from "@/src/assets/images/ASC22.jpg";
import avion from "@/src/assets/images/avion.png";
import DownArrowOption from "@/src/assets/icons/DownArrowOption.svg";
import Xicon from "@/src/assets/icons/Xicon.svg";
import searchicon from "@/src/assets/icons/search.svg";
import calendarIcon from "@/src/assets/icons/calendarIcon.svg";
import doubleUser from "@/src/assets/icons/doubleUser.svg";
// import AntDatePicker from "@/src/datePicker/AntDatePicker";
import {
  DatePicker,
  Spin,
  Image,
  Space,
  Skeleton,
  Select,
  Progress,
  BorderBeam,
  Popover,
} from "antd";
import { CameraOutlined, QrcodeOutlined } from "@ant-design/icons";
import moment from "moment";
import {
  updateUserById,
  fetchUserByid,
  deleteUserById,
} from "@/src/redux/actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import NoData from "@/src/components/common/NoData";
import {
  UpdateANTButton,
  CancelButton,
} from "@/src/components/buttons/GlobalButtons";
import Loader from "@/src/components/common/Loader";
import {
  BigImageAvatar,
  AdvImageAvatar,
} from "@/src/components/common/ImageAvatar";
import { BigInitialAvatar } from "@/src/components/common/InitialAvatar";
import toast from "@/src/components/notification/CustomToast";
import { singleUploadToS3 } from "@/src/redux/actions/commonAction";
import CustomDatePicker from "@/src/components/datePicker/CustomDatePicker";
import QrcodeGenerator from "@/src/components/Barcode/QrcodeGenerator";
import MyPhoneInput from "@/src/components/phoneNumber/MyPhoneInput2";
import isPhoneValid from "@/src/components/phoneNumber/isPhoneValid";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const path = usePathname();
  const searchParams = useSearchParams();
  const { id } = useParams();
  let blocker = { state: "state" };

  const getMode = searchParams.get("mode");
  const isScannerMode = getMode === "scanner";
  // if user make url mismatch
  useEffect(() => {
    if (getMode && getMode !== "scanner") {
      router.push("/error", { replace: true });
    }
  }, [router, getMode]);

  const { t, i18n } = useTranslation();

  const [Ankit] = useAutoAnimate();

  const single_Input_File = useRef(null);
  const isDisabled = true;

  const userID = localStorage.getItem("userid");
  const userImage2 = localStorage.getItem("userImage");

  const fetchUserRes = useSelector((state) => state.user.fetchUserRes);

  const updateUserByIdRes = useSelector(
    (state) => state.user.updateUserByIdRes,
  );
  const deleteUserByIdRes = useSelector(
    (state) => state.user.deleteUserByIdRes,
  );

  const [userImage, setUserImage] = useState("");
  const [userImageS3Url, setUserImageS3Url] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [validemail, setValidemail] = useState(false);
  const [password, setPassword] = useState("");
  const [creationDate, setCreationDate] = useState();
  const [age, setAge] = useState("");
  const [role, setRole] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [warning, setWarning] = useState({});
  const [btnHover, setBtnHover] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showQRcode, setShowQRcode] = useState(false);

  // asc cancel popup start
  const [cancelPopupShow, setCancelPopupShow] = useState(false);
  const handleClose = () => {
    setCancelPopupShow(false);
    blocker.reset();
  };

  const handleYes2 = () => {
    router.back();
  };

  // when block navigation while form is dirty👇
  const handleYes = () => {
    if (blocker.location) {
      blocker.proceed();
    }
  };

  const [typeInScreen, setTypeInScreen] = useState("");
  // asc cancel popup end

  useEffect(() => {
    dispatch(fetchUserByid(id));
  }, []);

  useEffect(() => {
    if (fetchUserRes.status === true) {
      setUserImageS3Url(fetchUserRes.data.image);
      setUserImage(fetchUserRes.data.image);
      setFirstName(fetchUserRes.data.firstName);
      setLastName(fetchUserRes.data.lastName);
      setEmail(fetchUserRes.data.email);
      setPassword(fetchUserRes.data.password);
      setPhoneNumber(fetchUserRes.data.phoneNumber);
      setAge(fetchUserRes.data.age);
      setRole(fetchUserRes.data.role);
      setCreationDate(fetchUserRes.data.creationDate);
      setLoading(false);
    }
  }, [fetchUserRes]);

  useEffect(() => {
    if (updateUserByIdRes.status === true) {
      localStorage.setItem(
        "userLoginData",
        JSON.stringify(updateUserByIdRes.data),
      );
      localStorage.setItem("userFirstName", updateUserByIdRes?.data?.firstName);
      localStorage.setItem("userLastName", updateUserByIdRes?.data?.lastName);
      localStorage.setItem("userImage", updateUserByIdRes?.data?.image);
    }
  }, [updateUserByIdRes]);

  const isPhoneNumValid = isPhoneValid(phoneNumber);

  const handleUpdateUser = () => {
    if (
      !firstName?.trim() ||
      !lastName?.trim() ||
      !email?.trim() ||
      !password?.trim() ||
      !age ||
      // phoneNumber?.length !== 10 ||
      !isPhoneNumValid ||
      !role
    ) {
      setWarning({
        firstName: !firstName?.trim() ? "Please fill your First Name!" : "",
        lastName: !lastName?.trim() ? "Please fill your Last Name!" : "",
        email: !email?.trim() ? "Please fill your Email!" : "",
        password: !password?.trim() ? "Please fill your Password!" : "",
        age: !age?.trim() ? "Please fill your Age!" : "",
        phoneNumber2: !phoneNumber
          ? "Please fill your Phone Number!"
          : phoneNumber.length !== 10
            ? "Phone number must be 10 digits"
            : "",
        phoneNumber: !isPhoneNumValid ? "Phone Number is not valid" : "",
        role: !role ? "Please select your Role!" : "",
      });
      return false;
    }
    setShowLoader(true);
    dispatch(
      updateUserById(id, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        age: age,
        role: role,
        image: userImageS3Url,
        // password: password,
      }),
    ).then((res) => {
      if (res.status === true) {
        toast.success({ description: "User updated successfully" });
        // router.push("/products");
      } else {
        toast.error({ description: res.message });
      }
      setShowLoader(false);
    });
  };

  const checkEmailValidation = (e) => {
    const emailPattern = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/;
    const emails = e.target.value;
    if (!emailPattern.test(emails) && emails.trim() !== "") {
      setValidemail(true);
    } else {
      setValidemail(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch(fetchUserByid(id));
    }
  };

  // block navigation when user changed url without saving start
  // const blocker = useBlocker(typeInScreen);

  useEffect(() => {
    if (blocker.state === "blocked") {
      // const confirmLeave = window.confirm(
      //   "You have unsaved changes. Are you sure you want to leave?"
      // );
      // if (confirmLeave) {
      //   blocker.proceed();
      // } else {
      //   blocker.reset();
      // }

      setCancelPopupShow(true);
    }
  }, [blocker]);
  // block navigation when user changed url without saving end

  const selectRoleOptions = [
    { roleName: "Owner", roleID: "asc1Owner", roleImage: avion },
    { roleName: "Viewer", roleID: "asc2Viewer", roleImage: avion },
    { roleName: "User", roleID: "asc3User", roleImage: avion },
    { roleName: "Manager", roleID: "asc4Manager", roleImage: avion },
  ];

  const handleFileUpload = (e) => {
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    let files;

    // Drag & Drop case
    if (e.dataTransfer) {
      files = Array.from(e.dataTransfer.files);
    }
    // File input case
    else if (e.target && e.target.files) {
      files = Array.from(e.target.files);
    }

    if (!files || files.length === 0) return;

    console.log("Uploaded files:", files);

    // Check file size
    // if (files && files[0].size > MAX_FILE_SIZE) {
    //   toast.warning({ description: `${files[0].name} exceeds 5MB` });
    //   e.target.value = "";
    //   return;
    // }

    // Single file
    if (files.length === 1) {
      console.log("Single file:", files[0]);
      // dispatch(singleUploadToS3(files[0]));
      dispatch(singleUploadToS3(files[0], OnProgress)).then((res) => {
        // setUserImageS3Url(res[0]);
        setUserImageS3Url(res?.secure_url);
      });
    }

    // reset input (important)
    if (e.target) {
      e.target.value = "";
    }
  };

  const [loadPercent, setLoadPercent] = useState(0);

  const OnProgress = (percent) => {
    setLoadPercent(percent);
  };

  const getColor = (p) => {
    if (p < 50) return "#2563eb"; // blue
    if (p < 80) return "#f59e0b"; // yellow
    return "#5CAF90"; // green
  };

  const vCard = `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName}
FN:${firstName} ${lastName}
TEL:${phoneNumber}
EMAIL:${email}
PHOTO;VALUE=URI:${userImage2}
URL:https://avion-frontend-development.up.railway.app/profile/${userID}
END:VCARD`;

  return (
    <div
      className=""
      // onContextMenu={(e) => e.preventDefault()}
    >
      {/* <div>
        <CustomDatePicker />
      </div> */}

      <Header
        // setQuery={setQuerystring}
        placeholder={"Search..."}
        showProductsCategory={true}
        leftComponent={
          <div className="leftComponentCss">
            <p className="text-[#5CAF90] font-medium text-[18px]">
              {/* You are in Products list */}
            </p>
          </div>
        }
      />

      {cancelPopupShow && (
        <WarningPopup
          open={cancelPopupShow}
          // onCancel={() => setCancelPopupShow(false)}
          onCancel={handleClose}
          onOk={handleYes}
          title={""}
          keyboard={true}
        />
      )}

      <div className="flex justify-center md:justify-end flex-wrap gap-4 pt-10 p-6 px-1">
        <CancelButton
          label={"Cancel"}
          className="w-full! sm:w-45!"
          // onClick={() => {
          //   if (typeInScreen !== "") {
          //     setCancelPopupShow(true);
          //   } else {
          //     router.back();
          //   }
          // }}
          // no need above onClick👆 when blocking navigation while form dirty👇
          onClick={() => router.back()}
        />

        <UpdateANTButton
          disabled={validemail || showLoader}
          onClick={handleUpdateUser}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          // isLoading={showLoader}
          isLoading={
            showLoader && {
              icon: (
                <div>
                  <Spin size="small" className="btn-custom-spin" />
                </div>
              ),
            }
          }
          className="addButton w-full! sm:w-45!"
          extraComponent={
            showLoader ? (
              <div>
                {/* <Spin size="small" className="btn-custom-spin" /> */}
                <span className="px-2">Updating...</span>
              </div>
            ) : (
              <div className="flex gap-3 justify-center pe-">
                <NextImage
                  className="icons mx-"
                  src={btnHover ? addicon : doubleUser}
                  alt=""
                />
                {id ? "Update User" : "Add User"}
              </div>
            )
          }
        />
      </div>

      <Skeleton
        avatar
        active
        loading={loading}
        paragraph={{ rows: 4 }}
        className="p-1 md:pt-10"
      >
        <BorderBeam count={2} duration={6} size={150}>
          <div
            className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 m-auto bg-(--card-bg) p-3 pt-6 2xl:mt-20 rounded-2xl shadow-(--my-shadow) relative"
            style={{ pointerEvents: isScannerMode ? "none" : "" }}
          >
            <div className="flex justify-center items-cente relative w-full">
              {userImage ? (
                // <BigImageAvatar
                //   image={userImage}
                //   style={{ width: "300px", height: "300px" }}
                // />
                <Progress
                  type="circle"
                  percent={loadPercent}
                  // steps={4}
                  size={320}
                  strokeWidth={4}
                  // strokeWidth={loadPercent > 0 ? 4 : 0}
                  // strokeColor="red"
                  // strokeColor={loadPercent >= 50 ? "#5CAF90" : "#2563eb"}
                  strokeColor={getColor(loadPercent)}
                  railColor="#e5e7eb"
                  // format={() => null} // text remove
                  format={() => (
                    <AdvImageAvatar
                      image={userImage}
                      clearImage={setUserImage}
                      // style={{ width: "220px", height: "220px" }}
                      className="w-[70vw]! h-[70vw]! max-w-[300px] max-h-[300px]"
                    />
                  )}
                  classNames={{
                    body: "text-[0px]! w-[75vw]! h-[75vw]! max-w-[320px]! max-h-[320px]!",
                    rail: "hidden!",
                  }}
                />
              ) : (
                <BigInitialAvatar
                  firstName={firstName}
                  lastName={lastName}
                  // style={{ width: "300px", height: "300px" }}
                  className="w-[70vw] h-[70vw] max-w-[300px] max-h-[300px] text-[50px]!"
                />
              )}

              <label htmlFor="upload-single-image">
                <CameraOutlined
                  className="absolute left-0 -bottom-1 text-3xl! pointer text-(--badge-bg)!"
                  style={{ cursor: showQRcode ? "not-allowed" : "" }}
                  onClick={() => {
                    single_Input_File.current.click();
                  }}
                />
              </label>

              <Popover
                // open={showQRcode}
                // onOpenChange={setShowQRcode}
                title={
                  <p className="text-center text-[#6a5a50] font-semibold">
                    Scan to view profile
                  </p>
                }
                trigger="click"
                arrow={false}
                placement="topLeft"
                classNames={{
                  root: "shadow-xl",
                  container: "bg-(--popup-bg)!",
                  content: "",
                }}
                content={
                  <QrcodeGenerator
                    textValue={vCard}
                    // url={`https://avion-frontend-development.up.railway.app/profile/${userID}`}
                  />
                }
              >
                <QrcodeOutlined
                  className="absolute right-0 -bottom-1 text-3xl! pointer text-(--badge-bg)!"
                  onClick={() => {
                    setShowQRcode(!showQRcode);
                  }}
                />
              </Popover>
            </div>

            {/* no need to use ref if we use setting img under label
            OR we can use htmlFor  like above */}

            {/* hidden input field start */}
            <input
              multiple
              type="file"
              accept="image/*,"
              id="upload-single-image"
              // ref={single_Input_File}
              style={{ display: "none" }}
              onChange={(e) => {
                const singleFile = e.target.files[0];
                // make preview local URL to show img in src.
                const singlePreview = URL.createObjectURL(singleFile);
                setUserImage(singlePreview);
                handleFileUpload(e);
                console.log("asc single file", singleFile);
                // dispatch(singleUploadToS3(singleFile));

                e.target.value = ""; // Reset input value
              }}
            />
            {/* hidden input field end */}

            {/* RIGHT SIDE - INPUTS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="asc-input-container" id="ascNewInput">
                <label className="asc-top-label labelText bg-(--card-bg)!">
                  {t("First Name")}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  // disabled
                  className="asc-Normal-Input bg-(--card-bg)!"
                  style={{
                    border: warning.firstName && "1px solid #dc3545",
                  }}
                  placeholder="Enter your First Name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setWarning((prev) => ({
                      ...prev,
                      firstName: "",
                    }));
                    setTypeInScreen(e.target.value);
                  }}
                  onKeyDown={handleKeyDown}
                />
                <br />
                <span className="warningTxt ps-2">{warning.firstName}</span>
              </div>

              <div className="asc-input-container" id="ascNewInput">
                <label className="asc-top-label labelText bg-(--card-bg)!">
                  Last Name
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  // disabled
                  className="asc-Normal-Input bg-(--card-bg)!"
                  style={{
                    border: warning.lastName && "1px solid #dc3545",
                  }}
                  placeholder="Enter your Last Name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setWarning((prev) => ({
                      ...prev,
                      lastName: "",
                    }));
                    setTypeInScreen(e.target.value);
                  }}
                  onKeyDown={handleKeyDown}
                />
                <br />
                <span className="warningTxt ps-2">{warning.lastName}</span>
              </div>

              <div className="asc-input-container" id="ascNewInput">
                <label className="asc-top-label labelText bg-(--card-bg)!">
                  Email
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  // disabled
                  className="asc-Normal-Input bg-(--card-bg)!"
                  style={{ border: warning.email && "1px solid #dc3545" }}
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setWarning((prev) => ({
                      ...prev,
                      email: "",
                    }));
                    setTypeInScreen(e.target.value);
                    checkEmailValidation(e);
                  }}
                  onKeyDown={handleKeyDown}
                />
                <br />
                <span className="warningTxt ps-2">
                  {warning.email}
                  {validemail && "Email is invalid!"}
                </span>
              </div>

              <div className="asc-input-container" id="ascNewInput">
                <label className="asc-top-label labelText bg-(--card-bg)!">
                  Password
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  disabled
                  className="asc-Normal-Input bg-(--card-bg)!"
                  style={{
                    border: warning.password && "1px solid #dc3545",
                  }}
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setWarning((prev) => ({
                      ...prev,
                      password: "",
                    }));
                    setTypeInScreen(e.target.value);
                  }}
                  onKeyDown={handleKeyDown}
                />
                <br />
                <span className="warningTxt ps-2">{warning.password}</span>
              </div>

              <div className="asc-input-container" id="ascNewInput">
                <label className="asc-top-label labelText bg-(--card-bg)!">
                  Phone Number
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  // disabled
                  className="asc-Normal-Input bg-(--card-bg)! hidden"
                  placeholder="Enter your Phone Number"
                  style={{
                    border: warning.phoneNumber && "1px solid #dc3545",
                  }}
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    setWarning((prev) => ({
                      ...prev,
                      phoneNumber: "",
                    }));
                    setTypeInScreen(e.target.value);
                  }}
                  onKeyDown={handleKeyDown}
                />
                <div
                  className="asc-Normal-Input bg-(--card-bg)! pt-3 px-0!"
                  style={{
                    border: warning.phoneNumber && "1px solid #dc3545",
                  }}
                  id="profile-phone-input"
                >
                  <MyPhoneInput
                    disabled={false}
                    value={phoneNumber}
                    onChange={(val, inputValue, country) => {
                      setPhoneNumber(val);
                      setWarning((prev) => ({
                        ...prev,
                        phoneNumber: "",
                      }));
                      setTypeInScreen(val);
                    }}
                    style={{}}
                    className="pt-"
                    onKeyDown={handleKeyDown}
                  />
                </div>
                {/* <br /> */}
                <span className="warningTxt ps-2">{warning.phoneNumber}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="asc-input-container" id="ascNewInput">
                  <label className="asc-top-label labelText bg-(--card-bg)!">
                    Age
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    // disabled
                    min={18}
                    className="asc-Normal-Input bg-(--card-bg)!"
                    placeholder="Enter your Age"
                    style={{ border: warning.age && "1px solid #dc3545" }}
                    value={age}
                    onChange={(e) => {
                      setAge(e.target.value);
                      setWarning((prev) => ({
                        ...prev,
                        age: "",
                      }));
                      setTypeInScreen(e.target.value);
                    }}
                    onKeyDown={handleKeyDown}
                  />
                  <br />
                  <span className="warningTxt ps-2">{warning.age}</span>
                </div>

                <div className="asc-input-container" id="ascNewInput">
                  <label className="asc-top-label labelText bg-(--card-bg)!">
                    Role
                    <span className="text-red-500">*</span>
                  </label>
                  <Select
                    placeholder="Select your role"
                    value={role}
                    className="asc-Normal-Input bg-(--card-bg)!"
                    style={{
                      width: "100%",
                      paddingRight: "11px",
                      border: warning.role && "1px solid #dc3545",
                    }}
                    // onChange={handleChange}
                    onChange={(value) => {
                      setRole(value);
                      setWarning((prev) => ({
                        ...prev,
                        role: "",
                      }));
                      setTypeInScreen(value);
                    }}
                    showSearch={{
                      optionFilterProp: ["label", "value"],
                    }}
                    allowClear
                    // options={listData}
                    options={selectRoleOptions.map((item) => ({
                      value: item?.roleID,
                      label: item?.roleName,
                      avatar: item?.roleImage,
                    }))}
                    optionRender={(option) => (
                      <div className="flex items-center gap-2 p-2">
                        <NextImage
                          src={option?.data?.avatar}
                          alt=""
                          style={{ width: "26px", height: "26px" }}
                          className="rounded-[100%]"
                        />
                        <span className="text-[#4b5966] text-[16px]">
                          {option?.label}
                        </span>
                      </div>
                    )}
                  />
                  <br />
                  <span className="warningTxt ps-2">{warning.role}</span>
                </div>
              </div>
            </div>
          </div>
        </BorderBeam>
      </Skeleton>
    </div>
  );
};

export default Profile;
