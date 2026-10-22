"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import NextImage from "next/image";
import "./Signup.css";
import { DatePicker, Spin, Image, Space, Select } from "antd";
import MyPhoneInput from "@/src/components/phoneNumber/MyPhoneInput2";
import { PhoneNumberUtil } from "google-libphonenumber";

import {
  PlusCircleOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Footer from "@/src/layouts/Footer";
import avion from "@/src/assets/images/avion.png";
import eye from "@/src/assets/icons/eye.svg";
import eyeClose from "@/src/assets/icons/eyeClose.svg";
import addicon from "@/src/assets/icons/addicon.svg";
import doubleUser from "@/src/assets/icons/doubleUser.svg";
import { useSelector, useDispatch } from "react-redux";
import { signupApi } from "@/src/redux/actions/userAction";
import { singleUploadToS3 } from "@/src/redux/actions/commonAction";
// import WarningPopup  from "../dialogs/WarningPopup";
import toast from "@/src/components/notification/CustomToast";
import OnProgressToast from "@/src/components/notification/OnProgressToast";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  AddButton,
  CancelButton,
  SubmitButton,
} from "@/src/components/buttons/GlobalButtons";
import imageCompression from "browser-image-compression";
import {
  compressedSingleImage,
  compressedMultipleImages,
} from "@/src/utils/compressedImages";
import { sendOTPEmail, verifyOTP } from "@/src/redux/actions/emailAction";
import OTPModal from "@/src/services/OTPModal";

const Signup = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [Ankit] = useAutoAnimate();
  const single_Input_File = useRef(null);

  const signupRes = useSelector((state) => state.user.signupRes);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [validemail, setValidemail] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState(null);
  const [userImage, setUserImage] = useState("");
  const [userImageS3Url, setUserImageS3Url] = useState("");
  const [multipleImages, setMultipleImages] = useState([]);
  const [warning, setWarning] = useState({});
  const [btnHover, setBtnHover] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // asc cancel popup start
  const [cancelPopupShow, setCancelPopupShow] = useState(false);
  const handleClose = () => setCancelPopupShow(false);

  const handleYes = () => {
    router.back();
  };
  const [typeInScreen, setTypeInScreen] = useState("");
  // asc cancel popup end

  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const handleSendOtp = () => {
    dispatch(sendOTPEmail({ email: email }));
    setOtpModalOpen(true);
    toast.info({
      description: `${firstName} you're almost there! Verify the OTP sent to your email to complete your signup.`,
    });
  };

  useEffect(() => {
    if (signupRes.status === true) {
      localStorage.setItem("userLoginData", JSON.stringify(signupRes.data));
      localStorage.setItem("userFirstName", signupRes.data.firstName);
      localStorage.setItem("userLastName", signupRes.data.lastName);
      localStorage.setItem("userImage", signupRes.data.image);
      localStorage.setItem("userid", signupRes.data.userId);

      sessionStorage.setItem("token", signupRes?.token);

      // toast.success({
      //   description: `${signupRes.data.firstName} you signup successfully`,
      // });

      // router.push("/dashboard");
      handleSendOtp();
    } else {
      setWarning((prev) => ({
        ...prev,
        email: signupRes.error,
      }));

      setShowLoader(false);
    }
  }, [signupRes]);

  const handleSignup = () => {
    if (
      !firstName?.trim() ||
      !lastName?.trim() ||
      !email?.trim() ||
      !password?.trim() ||
      !age ||
      // phone.length !== 10 ||
      !isPhoneNumValid ||
      !role
    ) {
      setWarning({
        firstName: !firstName?.trim() ? "Please fill your First Name!" : "",
        lastName: !lastName?.trim() ? "Please fill your Last Name!" : "",
        email: !email?.trim() ? "Please fill your Email!" : "",
        password: !password?.trim() ? "Please fill your Password!" : "",
        age: !age?.trim() ? "Please fill your Age!" : "",
        phone2: !phone
          ? "Please fill your Phone Number!"
          : phone.length !== 10
            ? "Phone number must be 10 digits"
            : "",
        phone: !isPhoneNumValid ? "Phone Number is not valid" : "",
        role: !role ? "Please select your Role!" : "",
      });
      return false;
    }
    setShowLoader(true);
    dispatch(
      signupApi(
        firstName,
        lastName,
        userImageS3Url,
        email,
        password,
        age,
        role,
        phone,
      ),
    );
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

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const handleFileUpload = async (e) => {
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
    if (files && files[0].size > MAX_FILE_SIZE) {
      toast.error({ description: `${files[0].name} exceeds 5MB` });
      e.target.value = "";
      return;
    }

    // Single file
    if (files.length === 1) {
      console.log("Single file:", files[0]);
      // dispatch(singleUploadToS3(files[0]));
      dispatch(singleUploadToS3(files[0], OnProgressToast)).then((res) => {
        // setUserImageS3Url(res[0]);
        setUserImageS3Url(res?.secure_url);
      });
    }

    // Single file with compressed image
    if (files.length === 1_0) {
      // let compressedFile = files[0];
      // if (compressedFile.type.startsWith("image/")) {
      //   compressedFile = await imageCompression(compressedFile, {
      //     maxSizeMB: 1,
      //     maxWidthOrHeight: 1200,
      //     useWebWorker: true,
      //     fileType: "image/webp",
      //     initialQuality: 0.8,
      //   });
      // }

      let compressedFile = await compressedSingleImage(files[0]);

      console.log("Single file:", files[0]);
      console.log("compressedFile Single file:", compressedFile);
      dispatch(singleUploadToS3(compressedFile, OnProgressToast)).then(
        (res) => {
          // setUserImageS3Url(res[0]);
          setUserImageS3Url(res?.secure_url);
        },
      );
    }

    // Multiple files (docs / pdf etc.)
    if (files.length > 1) {
      console.log("Multiple files:", files);
      // dispatch(multipleUploadToS3(files));
    }

    // Multiple files with compressed images only
    if (files.length > 1) {
      // const compressedFiles = await Promise.all(
      //   files.map(async (item) => {
      //     if (item.type.startsWith("image/")) {
      //       return await imageCompression(item, {
      //         maxSizeMB: 1,
      //         maxWidthOrHeight: 1200,
      //         useWebWorker: true,
      //         fileType: "image/webp",
      //       });
      //     }
      //     return item;
      //   }),
      // );

      let compressedFiles = await compressedMultipleImages(files);
      console.log("Multiple files:", files);
      console.log("Multiple files:", compressedFiles);
      // dispatch(multipleUploadToS3(compressedFiles));
    }

    // reset input (important)
    if (e.target) {
      e.target.value = "";
    }
  };

  const listData = [
    { label: "Owner", value: "asc1" },
    { label: "Viewer", value: "asc2" },
    { label: "User", value: "asc3" },
    { label: "Manager", value: "asc4" },
  ];

  const selectRoleOptions = [
    { roleName: "Owner", roleID: "asc1Owner", roleImage: avion },
    { roleName: "Viewer", roleID: "asc2Viewer", roleImage: avion },
    { roleName: "User", roleID: "asc3User", roleImage: avion },
    { roleName: "Manager", roleID: "asc4Manager", roleImage: avion },
  ];

  const phoneUtil = PhoneNumberUtil.getInstance();
  const isPhoneValid = (phone) => {
    try {
      return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    } catch (error) {
      return false;
    }
  };
  const isPhoneNumValid = isPhoneValid(phone);

  const handlePhoneChange = useCallback((val, inputValue, country) => {
    console.log("phone data", val);
    setPhone(val);
    setWarning((prev) => ({
      ...prev,
      phone: "",
    }));
  }, []);

  const handleVerifyOtp = (otp) => {
    dispatch(
      verifyOTP({
        email,
        otp,
      }),
    )
      .then((res) => {
        if (res?.status === true) {
          toast.success({
            description: `${signupRes.data.firstName} you signup successfully`,
          });
          router.push("/dashboard");
        }
      })
      .catch((error) => {
        toast.error({
          description:
            error.response?.data?.message ||
            error.response.data.error ||
            "Unable to process.",
        });
        if (
          error.response?.status === 404 &&
          error.response?.data?.error === "User not found"
        ) {
          toast.error({
            description:
              "Your signup session has expired. Please signup again.",
          });

          setTimeout(() => {
            setOtpModalOpen(false);
            router.push("/login");
            window.location.reload();
          }, 2000);
        }
      });
  };

  return (
    <div className="p-5">
      <OTPModal
        open={otpModalOpen}
        email={email}
        onClose={() => {
          setOtpModalOpen(false);
          router.push("/login");
          window.location.reload();
        }}
        onVerify={(otp) => {
          handleVerifyOtp(otp);
        }}
        onResend={() => {
          handleSendOtp();
        }}
      />
      <div className="buttonsDiv pt-5 px-3">
        <NextImage
          src="/avion.png"
          alt=""
          width={60}
          height={1}
          className="absolute left-5 top-42.5 sm:top-8 animate__animated animate__backInDown shadow-(--my-shadow) rounded-full"
        />
        <CancelButton
          label={"Cancel"}
          className="w-full! sm:w-45! border-[#4096FF]!"
          onClick={() => {
            if (typeInScreen !== "") {
              setCancelPopupShow(true);
            } else {
              router.back();
            }
          }}
        />

        <SubmitButton
          disabled={
            // !firstName ||
            // !lastName ||
            // !email ||
            // !password ||
            // !age ||
            // Number(age) < 18 ||
            // Number(age) > 80 ||
            // !phone ||
            // phone.length !== 10 ||
            // !role ||
            // Object.values(warning).some((item) => item !== "") ||
            validemail || showLoader
          }
          label={""}
          className="w-full! sm:w-45!  border-[#4096FF]! bg-[#4096FF]! hover:bg-[#1677ff]!"
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          onClick={handleSignup}
          extraComponent={
            showLoader ? (
              <div>
                <Spin size="small" className="btn-custom-spin" />
                <span className="px-2">Signing up...</span>
              </div>
            ) : (
              <div className="flex gap-3 justify-center pe-">
                <NextImage
                  className="icons mx-"
                  width={20}
                  height={20}
                  src={btnHover ? addicon : doubleUser}
                  alt=""
                />
                Signup
              </div>
            )
          }
        />
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-0 m-auto pt-7 lg:w-[70%] w-full"
        ref={Ankit}
      >
        <div
          // className={`dottedPlusDiv ${isDragging ? "dragging" : ""}`}
          className={`w-full md:col-span-2 flex justify-center ${
            isDragging ? "dragging" : ""
          }`}
          onDragEnter={(e) => {
            e.preventDefault();
            setIsDragging(true); // 👈 Jab drag start ho
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setIsDragging(false); // 👈 Jab drag bahar chala jaaye
          }}
          // on drag upload img start
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true); // 👈 set to true when dragging.
          }}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false); // 👈 reset when drag leaves.
            const droppedFiles = Array.from(e.dataTransfer.files);
            handleFileUpload(e);
            if (droppedFiles.length > 0) {
              const firstFile = droppedFiles[0];
              const previewUrl = URL.createObjectURL(firstFile);
              setUserImage(previewUrl);
              // onDrag_handleFileUpload(droppedFiles[0], "item");
              // dispatch(filesInsertDocToS3(droppedFiles));
            }
          }}
          // on drag upload img end
        >
          {userImage ? (
            <Image
              width={300}
              height={300}
              alt=""
              src={userImage}
              className="userImg"
              // classNames={{
              //   // cover: "image-cover",
              //   cover: "rounded-full",
              // }}
              styles={{
                cover: {
                  borderRadius: "50%",
                },
              }}
              // placeholder={{ progress: { percent: OnProgressToast } }}
              preview={{
                mask: { blur: true },
                cover: (
                  <div className="flex items-center justify-center gap-4">
                    <EyeOutlined style={{ fontSize: 22 }} />
                    <DeleteOutlined
                      style={{ fontSize: 22 }}
                      onClick={(e) => {
                        e.stopPropagation(); // important
                        setUserImage(null);
                      }}
                    />
                  </div>
                ),
              }}
            />
          ) : (
            <div className="uploadImageBox mb-3">
              <p>Upload your image</p>
              <PlusCircleOutlined
                className="mt-7 pointer text-3xl"
                onClick={() => {
                  single_Input_File.current.click();
                }}
              />
            </div>
          )}
        </div>

        {/* hidden input field start */}
        <input
          multiple
          // webkitdirectory="true" // for upload folder
          // directory="true" // for upload folder
          type="file"
          // accept="image/*,.doc,.pdf"
          // accept="image/png"
          accept="image/*"
          ref={single_Input_File}
          style={{ display: "none" }}
          onChange={(e) => {
            const singleFile = e.target.files[0];
            // make preview local URL to show img in src.
            const singlePreview = URL.createObjectURL(singleFile);
            setUserImage(singlePreview);
            handleFileUpload(e);
            console.log("asc single file", singleFile);
            // dispatch(singleUploadToS3(singleFile));

            // for multiple files uploads👇
            const multipleFiles = Array.from(e.target.files);
            // make multiple preview local URL to show img in src.
            const multiPreviews = multipleFiles.map((fileItems) =>
              URL.createObjectURL(fileItems),
            );
            setMultipleImages(multiPreviews);
            console.log("asc multiple files", multipleFiles);
            if (multipleFiles.length > 0) {
              // dispatch(
              //   multipleUploadToS3(multipleFiles, setUploadProgress)
              // );
            }
            // Reset input value so same file can be selected again
            e.target.value = "";
          }}
        />
        {/* hidden input field end */}

        {/* multiple imgs previews start */}
        <div className="flex gap-3 flex-wrap absolute top-10 right-0">
          {multipleImages.map((item, index) => (
            <NextImage
              key={index}
              src={item}
              alt=""
              width={96}
              height={96}
              className="object-cover border-2 border-dotted border-gray-400 p-1 multiImgBox"
            />
          ))}
        </div>
        {/* multiple imgs previews end */}

        <div className="p-1">
          <label htmlFor="fname" className="signup-label ps-2">
            First Name
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fname"
            // disabled
            // autoFocus={true}
            placeholder="Enter your First Name"
            className="placeholder-gray-600 signup-input pe-5"
            style={{ border: warning.firstName && "1px solid #dc3545" }}
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              setWarning((prev) => ({
                ...prev,
                firstName: "",
              }));
            }}
          />
          <br />
          <span className="warningTxt ps-2">{warning.firstName}</span>
        </div>

        <div className="p-1">
          <label htmlFor="lname" className="signup-label ps-2">
            Last Name
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="lname"
            placeholder="Enter your Last Name"
            className="placeholder-gray-600 signup-input pe-5"
            style={{ border: warning.lastName && "1px solid #dc3545" }}
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              setWarning((prev) => ({
                ...prev,
                lastName: "",
              }));
            }}
          />
          <br />
          <span className="warningTxt ps-2">{warning.lastName}</span>
        </div>

        <div className="p-1">
          <label htmlFor="ASCemail" className="signup-label ps-2">
            Email
            <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="ASCemail"
            placeholder="Enter your Email"
            className="placeholder-gray-600 signup-input pe-5"
            style={{ border: warning.email && "1px solid #dc3545" }}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              checkEmailValidation(e);
              setWarning((prev) => ({
                ...prev,
                email: "",
              }));
            }}
            onBlur={(e) => {
              setEmail(e.target.value.trim().toLowerCase());
            }}
          />
          <br />
          <span className="warningTxt ps-2">
            {warning.email}
            {validemail && "Email is invalid!"}
          </span>
        </div>

        <div className="p-1" style={{ position: "relative" }}>
          <label htmlFor="ASCemail" className="signup-label ps-2">
            Password
            <span className="text-red-500">*</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your Password"
            className="placeholder-gray-600 signup-input pe-12"
            style={{ border: warning.password && "1px solid #dc3545" }}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setWarning((prev) => ({
                ...prev,
                password: "",
              }));
            }}
          />
          <NextImage
            className="eyeIcon pointer absolute"
            style={{ top: "48px", right: "15px" }}
            src={showPassword ? eye : eyeClose}
            alt=""
            width={20}
            height={20}
            onClick={() => setShowPassword(!showPassword)}
          />
          <br />
          <span className="warningTxt ps-2">{warning.password}</span>
        </div>

        <div className="p-1">
          <label htmlFor="age" className="signup-label ps-2">
            Age
            <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min={18}
            max={80}
            name="age"
            required
            placeholder="Enter your Age"
            className="placeholder-gray-600 signup-input px-2"
            style={{ border: warning.age && "1px solid #dc3545" }}
            value={age}
            onChange={(e) => {
              // setAge(e.target.value);
              let value = e.target.value;

              // sirf 2 digits allow
              if (value.length > 2) {
                setWarning((prev) => ({
                  ...prev,
                  age: "Only valid age allowed",
                }));
                return;
              }

              // 0 not allowed
              if (value === "0") {
                setWarning((prev) => ({
                  ...prev,
                  age: "Age must be between 18 to 80",
                }));
                return;
              }

              // max 80
              if (value === "" || value <= 80) {
                setAge(value);
                setWarning((prev) => ({
                  ...prev,
                  age: "",
                }));
              }
            }}
          />
          <br />
          <span className="warningTxt ps-2">{warning.age}</span>
        </div>

        <div className="p-1" id="my-phoneInpu-t">
          <label htmlFor="phnumber" className="signup-label ps-2">
            Phone Number
            <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="phnumber"
            placeholder="Enter your Phone Number"
            className="placeholder-gray-600 signup-input px-2 hidden"
            style={{ border: warning.phone && "1px solid #dc3545" }}
            value={phone}
            onChange={(e) => {
              // setPhone(e.target.value);

              let value = e.target.value;

              // max 10 digits allow
              if (value.length > 10) {
                setWarning((prev) => ({
                  ...prev,
                  phone: "Phone number must be 10 digits",
                }));
                return;
              }

              setPhone(value);

              // validation warning
              if (value.length > 0 && value.length < 10) {
                setWarning((prev) => ({
                  ...prev,
                  phone: "Phone number must be 10 digits",
                }));
              } else {
                setWarning((prev) => ({
                  ...prev,
                  phone: "",
                }));
              }
            }}
          />
          {/* library */}
          <div
            className="signup-input pt-2 px-0!"
            style={{ border: warning.phone && "1px solid #dc3545" }}
            id="profile-phone-input"
          >
            <MyPhoneInput
              disabled={false}
              value={phone}
              onChange2={(val, inputValue, country) => {
                console.log("phone data", val);
                setPhone(val);
              }}
              onChange={handlePhoneChange}
            />
          </div>
          {/* <br /> */}
          {/* {!isPhoneNumValid && (
            <span className="warningTxt ps-2">Phone is not valid</span>
          )} */}
          <span className="warningTxt ps-2">{warning.phone}</span>
        </div>

        <div>
          <label htmlFor="role" className="signup-label ps-2">
            Role
            <span className="text-red-500">*</span>
          </label>
          <Select
            placeholder="Select your role"
            value={role}
            className="signup-input px-2"
            style={{
              width: "100%",
              border: warning.role && "1px solid #dc3545",
            }}
            // onChange={handleChange}
            onChange={(value) => {
              setRole(value);
              setWarning((prev) => ({
                ...prev,
                role: "",
              }));
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

      <Footer />
    </div>
  );
};

export default Signup;
