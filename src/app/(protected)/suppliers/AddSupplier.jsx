"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import NextImage from "next/image";
import "./Supplier.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import supplierSchema from "./SupplierValidation";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import Header from "@/src/layouts/Header";
import WarningPopup from "@/src/components/dialogs/WarningPopup";
import addicon from "@/src/assets/icons/addicon.svg";
import singleUser from "@/src/assets/icons/singleUser.svg";
import avion from "@/src/assets/images/avion.png";
import DownArrowOption from "@/src/assets/icons/DownArrowOption.svg";
import Xicon from "@/src/assets/icons/Xicon.svg";
import searchicon from "@/src/assets/icons/search.svg";
import calendarIcon from "@/src/assets/icons/calendarIcon.svg";
import doubleUser from "@/src/assets/icons/doubleUser.svg";
import reactIcon from "@/src/assets/icons/reactIcon.svg";
import javaIcon from "@/src/assets/icons/java-icon.svg";
import javaScriptIcon from "@/src/assets/icons/javaScript-icon.svg";
import sqlIcon from "@/src/assets/icons/sql-icon.svg";
import pythonIcon from "@/src/assets/icons/pythonIcon.svg";
import nodeJSicon from "@/src/assets/icons/nodeJSicon.svg";
import mongodbIcon from "@/src/assets/icons/mongodb-icon.svg";
import { useSelector, useDispatch } from "react-redux";
// import AntDatePicker from "@/src/datePicker/AntDatePicker";
import { DatePicker, Spin, Skeleton, Popover, Tag } from "antd";
import { CheckOutlined, SafetyOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import toast from "@/src/components/notification/CustomToast";
import moment from "moment";
import NoData from "@/src/components/common/NoData";
import {
  AddButton,
  CancelButton,
  SubmitButton,
} from "@/src/components/buttons/GlobalButtons";
import MyPhoneInput from "@/src/components/phoneNumber/MyPhoneInput2";
import isPhoneValid from "@/src/components/phoneNumber/isPhoneValid";

// Tan stack useHooks
import {
  useAddSupplier,
  useUpdateSupplier,
  useFetchSupplierById,
} from "./services/useSupplier";

const AddSupplier = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathName = usePathname();
  const params = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(supplierSchema),
    defaultValues: {
      supplierName: "",
      companyName: "",
      phoneNumber: "",
      email: "",
      creationDate: "",
      address: "",
      gstNumber: "",
      city: "",
      state: "",
      pinCode: "",
    },
  });

  console.log("param", params.id);
  const isUpdating = Boolean(params.id);
  const [Ankit] = useAutoAnimate();

  const [supplierName, setSupplierName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [validemail, setValidemail] = useState(false);
  const [creationDate, setCreationDate] = useState("");
  const [technology, setTechnology] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [warning, setWarning] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  // for select Box start
  const [selectedLabel, setSelectedLabel] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [optionsShow, setOptionsShow] = useState(false);
  const [arrowOptionsRotate, setArrowOptionsRotate] = useState(false);
  // for select Box end

  // asc cancel popup start
  const [cancelPopupShow, setCancelPopupShow] = useState(false);
  const handleClose = () => setCancelPopupShow(false);

  const handleYes = () => {
    router.back();
  };
  const [typeInScreen, setTypeInScreen] = useState("");
  // asc cancel popup end

  const isPhoneNumValid = isPhoneValid(phoneNumber);

  // Tan stack fetch supplier by id
  const {
    data: fetchSupplierByIdRes,
    isLoading: isFetchSupplierByIdLoading,
    isError: isFetchSupplierByIdError,
    error: fetchSupplierByIdError,
  } = useFetchSupplierById(params.id);

  // Tan stack add supplier
  const {
    mutateAsync: triggerAddSupplier,
    data: addSupplierRes,
    isPending: isAddingSupplier,
    isError: isAddSupplierError,
    error: addSupplierError,
    isSuccess: isAddSupplierSuccess,
    reset: resetAddSupplierState,
  } = useAddSupplier();

  // Tan stack update supplier by id
  const {
    mutateAsync: updateSupplierById,
    data: updateSupplierByidRes,
    isPending: isUpdatingSupplier,
    isError: isUpdateSupplierError,
    error: UpdateSupplierError,
    isSuccess: isUpdateSupplierSuccess,
    reset: resetUpdateSupplierState,
  } = useUpdateSupplier();

  // when we add supplier start
  const handleAddSupplier = async () => {
    if (
      // supplierName === "" ||
      !isPhoneNumValid
    ) {
      setWarning(true);
      return;
    }

    triggerAddSupplier({
      name: supplierName,
      companyName,
      email,
      phone: phoneNumber,
      gstNumber: gstNumber,
      address: address,
      city: city,
      state: state,
      country: country,
      postalCode: pinCode,
      status: status,
    })
      .then((res) => {
        toast.success({
          description: `${supplierName} Added successfully`,
        });
        router.puah("/suppliers");
      })
      .catch((error) => {
        console.log("asc23", error.response);
        toast.error({
          description:
            addSupplierError?.response?.data?.error || "Something went wrong.",
        });
      });
  };
  // for Add supplier end👆.

  useEffect(() => {
    if (fetchSupplierByIdRes?.status === true) {
      setSupplierName(fetchSupplierByIdRes?.data.name);
      setCompanyName(fetchSupplierByIdRes?.data.companyName);
      setEmail(fetchSupplierByIdRes?.data.email);
      setPhoneNumber(fetchSupplierByIdRes?.data.phone);
      setGstNumber(fetchSupplierByIdRes?.data.gstNumber);
      setAddress(fetchSupplierByIdRes?.data.address);
      setCountry(fetchSupplierByIdRes?.data.country);
      setState(fetchSupplierByIdRes?.data.state);
      setCity(fetchSupplierByIdRes?.data.city);
      setPinCode(fetchSupplierByIdRes?.data.postalCode);
      setStatus(fetchSupplierByIdRes?.data.status);
      // setTechnology(fetchSupplierByIdRes?.data.technology);
      setCreationDate(dayjs(fetchSupplierByIdRes?.data.creationDate));
      const data = fetchSupplierByIdRes.data;
      reset({
        supplierName: data.name,
        companyName: data.companyName,
        email: data.email,
        phoneNumber: data.phone,
        gstNumber: data.gstNumber,
        address: data.address,
        country: data.country,
        city: data.city,
        state: data.state,
        pinCode: data.postalCode,
        status: data.status,
      });
    }
  }, [fetchSupplierByIdRes]);

  // when we update supplier start
  const handleUpdateSupplier = async () => {
    try {
      const res = await updateSupplierById({
        supplierId: params.id,
        payload: {
          name: supplierName,
          companyName,
          email,
          phone: phoneNumber,
          gstNumber: gstNumber,
          address: address,
          city: city,
          state: state,
          country: country,
          postalCode: pinCode,
          status: status,
        },
      });
      toast.success({
        description: `${supplierName} Updated successfully`,
      });
      router.push("/suppliers");
    } catch (error) {
      toast.error({
        description: error?.response?.data?.message || "Something went wrong.",
      });
    }
  };
  // for Update supplier end👆.

  const checkEmailValidation = (e) => {
    const emailPattern = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/;
    const emails = e.target.value;
    if (!emailPattern.test(emails) && emails.trim() !== "") {
      setValidemail(true);
    } else {
      setValidemail(false);
    }
  };

  const listData = [
    { label: "Java", value: "asc1", image: javaIcon },
    { label: "JavaScript", value: "asc2", image: javaScriptIcon },
    { label: "React", value: "asc3", image: reactIcon },
    { label: "Python", value: "asc4", image: pythonIcon },
    { label: "Node", value: "asc5", image: nodeJSicon },
    { label: "MongoDB", value: "asc6", image: mongodbIcon },
    { label: "SQL", value: "asc7", image: sqlIcon },
  ];

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSupplier();
    }
  };

  const divWrapperCss = {
    background: "var(--card-bg)",
    padding: "30px 10px",
    borderRadius: "16px",
    boxShadow: "var(--my-shadow)",
  };

  return (
    <div className="">
      <Header
        // setQuery={setQuerystring}
        placeholder={"Search..."}
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
          onClick={() => {
            if (typeInScreen !== "") {
              setCancelPopupShow(true);
            } else {
              router.back();
            }
          }}
        />

        <SubmitButton
          disabled={validemail || isAddingSupplier || isUpdatingSupplier}
          // onClick={handleAddSupplier}
          // onClick={params.id ? handleUpdateSupplier : handleAddSupplier}
          onClick2={handleSubmit(
            params.id ? handleUpdateSupplier : handleAddSupplier,
          )}
          onClick={() => {
            setWarning(true);

            handleSubmit(
              params.id ? handleUpdateSupplier : handleAddSupplier,
            )();
          }}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          className="addButton w-full! sm:w-45!"
          extraComponent={
            isAddingSupplier || isUpdatingSupplier ? (
              <div>
                <Spin size="small" className="btn-custom-spin" />
                <span className="px-2">
                  {isUpdating ? "Updating..." : "Adding..."}
                </span>
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
                {isUpdating ? "Update Supplier" : "Add Supplier"}
              </div>
            )
          }
        />
      </div>

      <Skeleton
        active
        loading={fetchSupplierByIdRes?.loading}
        paragraph={{ rows: 4 }}
        className="sm:p-20"
      >
        <div style={divWrapperCss}>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2 m-auto pt-4 sm:px-6! lg:w-[9-5%] w-full">
            <div className="asc-input-container" id="ascNewInput">
              <label className="asc-top-label labelText">Supplier Name</label>
              <input
                type="text"
                // disabled
                className="asc-Normal-Input"
                style={{
                  border: errors.supplierName && "1px solid #dc3545",
                }}
                placeholder="Enter your Full Name"
                value={supplierName}
                // {...register("supplierName")}
                onChange={(e) => {
                  setSupplierName(e.target.value);
                  setTypeInScreen(e.target.value);
                  setValue("supplierName", e.target.value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                onKeyDown={handleKeyDown}
              />
              <br />
              <span className="warningTxt ps-2">
                {errors.supplierName?.message}
              </span>
            </div>

            <div className="asc-input-container" id="ascNewInput">
              <label className="asc-top-label labelText">Company Name</label>
              <input
                type="text"
                // disabled
                className="asc-Normal-Input"
                style={{ border: errors.companyName && "1px solid #dc3545" }}
                placeholder="Enter Company Name"
                value={companyName}
                // {...register("companyName")}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                  setTypeInScreen(e.target.value);
                  setValue("companyName", e.target.value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                onKeyDown={handleKeyDown}
              />
              <br />
              <span className="warningTxt ps-2">
                {errors.companyName?.message}
              </span>
            </div>

            <div className="asc-input-container hidden" id="ascNewInput">
              <Popover
                title=""
                trigger="click"
                arrow={false}
                placement="bottom"
                open={optionsShow}
                onOpenChange={(newOpen) => setOptionsShow(newOpen)}
                classNames={{
                  root: "ascSelectBo-x",
                  container: "p-0! bg-(--popup-bg)!",
                  content: "",
                }}
                content={
                  <div
                    className="ascSelectBox px-1 pb-2 top-[60px]! max-w-full!"
                    style={{ position: "unset" }}
                  >
                    <div className="selectBoxInput px-2 mx-2">
                      <NextImage
                        src={searchicon}
                        className="ascSearchicon"
                        alt="Search Icon"
                      />
                      <input
                        type="text"
                        // autoFocus={true}
                        className="ps-2 ascSearchInput w-full"
                        placeholder="Search..."
                        value={searchValue}
                        onChange={(e) => {
                          setSearchValue(e.target.value);
                        }}
                      />
                    </div>

                    <div className="selectBoxOptions" id="ascScroll">
                      {listData
                        .filter(
                          (x) =>
                            x.label
                              ?.toLowerCase()
                              .includes(searchValue.toLowerCase()) ||
                            x.value
                              ?.toLowerCase()
                              .includes(searchValue.toLowerCase()),
                        )
                        .map((item, index) => {
                          return (
                            <>
                              <div
                                key={index}
                                className={
                                  selectedValue === item.value
                                    ? "selectedItem pointer mb--2 me-1 ps-3 p-2 borderBottom"
                                    : "optionsItem pointer mb--2 me-1 ps-3 p-2 borderBottom"
                                }
                                onClick={() => {
                                  setSearchValue("");
                                  setSelectedLabel(item.label);
                                  setSelectedValue(item.value);
                                  setTechnology(item.label);
                                  setOptionsShow(false);
                                }}
                              >
                                <NextImage
                                  src={avion}
                                  alt=""
                                  className="option-img hidden"
                                />
                                <NextImage
                                  src={item.image}
                                  alt=""
                                  className="option-img"
                                />
                                <span className="px-2 truncate">
                                  {item.label}
                                </span>
                                {selectedValue === item.value && (
                                  <span className="ms-auto pe-2">
                                    <CheckOutlined />
                                  </span>
                                )}
                              </div>
                              <p className="borderBottom" />
                            </>
                          );
                        })}
                      {/* Display a message when no search are found */}
                      <NoData
                        listData={listData}
                        searchValue={searchValue}
                        filterParameters={listData.map(
                          (x) => `${x.label} ${x.value}`,
                        )}
                      />
                    </div>
                  </div>
                }
              >
                <div>
                  <label className="asc-top-label labelText">Technology</label>
                  <input
                    type="text"
                    // disabled
                    readOnly
                    className="asc-Normal-Input"
                    style={{
                      border: warning && !technology && "1px solid #dc3545",
                    }}
                    placeholder="Enter your Technology"
                    value={technology}
                    onChange={(e) => {
                      setTechnology(e.target.value);
                      setTypeInScreen(e.target.value);
                    }}
                    onKeyDown={handleKeyDown}
                    onClick={() => {
                      setOptionsShow(true);
                    }}
                  />
                </div>
              </Popover>

              <span className="warningTxt ps-2">
                {warning && !technology && "Please fill your technology!"}
              </span>
            </div>

            <div className="asc-input-container" id="ascNewInput">
              <label className="asc-top-label labelText">Email</label>
              <input
                type="email"
                // disabled
                className="asc-Normal-Input"
                style={{ border: errors.email && "1px solid #dc3545" }}
                placeholder="Enter your Email"
                value={email}
                // {...register("email")}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setTypeInScreen(e.target.value);
                  checkEmailValidation(e);
                  setValue("email", e.target.value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                onKeyDown={handleKeyDown}
              />
              <br />
              <span className="warningTxt ps-2">
                {errors.email?.message}
                {/* {validemail && "Email is invalid!"} */}
              </span>
            </div>

            <div className="asc-input-container" id="ascNewInput">
              <label className="asc-top-label labelText">Phone Number</label>
              <input
                type="tel"
                // disabled
                className="asc-Normal-Input hidden"
                placeholder="Enter your Phone Number"
                style={{
                  border: errors.phoneNumber && "1px solid #dc3545",
                }}
                value={phoneNumber}
                // {...register("phoneNumber")}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  setTypeInScreen(e.target.value);
                  setValue("phoneNumber", e.target.value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                onKeyDown={handleKeyDown}
              />
              <div
                className="asc-Normal-Input bg-(--card-bg)! pt-3 px-0!"
                style={{
                  border: warning && !isPhoneNumValid && "1px solid #dc3545",
                }}
                id="profile-phone-input"
              >
                <MyPhoneInput
                  disabled={false}
                  value={phoneNumber}
                  onChange={(val, inputValue, country) => {
                    setPhoneNumber(val);
                    setTypeInScreen(val);
                    setCountry(inputValue?.country?.name);
                    setValue("phoneNumber", val, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                  onKeyDown={handleKeyDown}
                />
              </div>
              {/* <br /> */}
              <span className="warningTxt ps-2">
                {/* {errors.phoneNumber?.message} */}
                {warning && !isPhoneNumValid && "Phone number is invalid"}
              </span>
            </div>

            <div className="asc-input-container" id="ascNewInput">
              <label className="asc-top-label labelText">GST Number</label>
              <input
                type="text"
                // disabled
                className="asc-Normal-Input"
                placeholder="Enter GST Number"
                style={{
                  border: errors.gstNumber && "1px solid #dc3545",
                }}
                value={gstNumber}
                // {...register("gstNumber")}
                onChange={(e) => {
                  setGstNumber(e.target.value);
                  setTypeInScreen(e.target.value);
                  setValue("gstNumber", e.target.value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                onKeyDown={handleKeyDown}
              />
              <br />
              <span className="warningTxt ps-2">
                {errors.gstNumber?.message}
              </span>
            </div>

            <div className="asc-input-container" id="ascNewInput">
              <label className="asc-top-label labelText">Date</label>
              <DatePicker
                size="large"
                id="asc-date"
                className="asc-Normal-Input outline-0!"
                style={{
                  border: errors.creationDate && "1px solid #dc3545",
                }}
                placeholder="Select a Date"
                // open={calendarOpen}
                value={creationDate}
                defaultValue={new Date()}
                // format={"DD-MM-YYYY"}
                format={{
                  format: "DD-MM-YYYY",
                  type: "mask",
                }}
                onChange={(e) => {
                  setCreationDate(e);
                  setCalendarOpen(false);
                  setValue("creationDate", e, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                onKeyDown={handleKeyDown}
                variant="borderless"
                // prefix={<img src={calendarIcon} alt="calendar" />}
                suffixIcon={
                  <NextImage
                    className="pointer icon"
                    src={calendarIcon}
                    alt="calendar"
                    width={20}
                    onClick={() => setCalendarOpen(!calendarOpen)}
                  />
                }
                // allowClear={false}
                multiple={false}
                showWeek={false}
                renderExtraFooter={() => (
                  <div>{/* Additional footer content */}</div>
                )}
              />
              <br />
              <span className="warningTxt ps-2">
                {errors.creationDate?.message}
              </span>
            </div>

            <div className="asc-input-container md:col-span-2" id="ascNewInput">
              <label className="asc-top-label labelText">Address</label>
              <input
                type="text"
                // disabled
                className="asc-Normal-Input"
                placeholder="Enter your Address"
                style={{
                  border: errors.address && "1px solid #dc3545",
                }}
                value={address}
                // {...register("address")}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setTypeInScreen(e.target.value);
                  setValue("address", e.target.value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                onKeyDown={handleKeyDown}
              />
              <br />
              <span className="warningTxt ps-2">{errors.address?.message}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-x-5 gap-y-2 pt-1 m-auto lg:w-[95%]">
            <div className="asc-input-container" id="ascNewInput">
              <label className="asc-top-label labelText">Country</label>
              <input
                type="text"
                disabled
                className="asc-Normal-Input"
                placeholder="Enter your Country"
                style={{
                  border: errors.country && "1px solid #dc3545",
                }}
                value={country}
                // {...register("country")}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setTypeInScreen(e.target.value);
                  setValue("country", e.target.value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                onKeyDown={handleKeyDown}
              />
              <br />
              <span className="warningTxt ps-2">{errors.country?.message}</span>
            </div>

            <div className="asc-input-container" id="ascNewInput">
              <label className="asc-top-label labelText">City</label>
              <input
                type="text"
                // disabled
                className="asc-Normal-Input"
                placeholder="Enter your City"
                style={{
                  border: errors.city && "1px solid #dc3545",
                }}
                value={city}
                // {...register("city")}
                onChange={(e) => {
                  setCity(e.target.value);
                  setTypeInScreen(e.target.value);
                  setValue("city", e.target.value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                onKeyDown={handleKeyDown}
              />
              <br />
              <span className="warningTxt ps-2">{errors.city?.message}</span>
            </div>

            <div className="asc-input-container" id="ascNewInput">
              <label className="asc-top-label labelText">State</label>
              <input
                type="text"
                // disabled
                className="asc-Normal-Input"
                placeholder="Enter your State"
                style={{
                  border: errors.state && "1px solid #dc3545",
                }}
                value={state}
                // {...register("state")}
                onChange={(e) => {
                  setState(e.target.value);
                  setTypeInScreen(e.target.value);
                  setValue("state", e.target.value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                onKeyDown={handleKeyDown}
              />
              <br />
              <span className="warningTxt ps-2">{errors.state?.message}</span>
            </div>

            <div className="asc-input-container" id="ascNewInput">
              <label className="asc-top-label labelText">Pin Code</label>
              <input
                type="text"
                // disabled
                className="asc-Normal-Input"
                placeholder="Enter your Pin Code"
                style={{
                  border: errors.pinCode && "1px solid #dc3545",
                }}
                value={pinCode}
                // {...register("pinCode")}
                onChange={(e) => {
                  setPinCode(e.target.value);
                  setTypeInScreen(e.target.value);
                  setValue("pinCode", e.target.value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                onKeyDown={handleKeyDown}
              />
              <br />
              <span className="warningTxt ps-2">{errors.pinCode?.message}</span>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl py-2 md:col-span-4">
              <div className="flex gap-4 items-center flex-wrap ps-4">
                <div className=" bg-blue-100 rounded-full">
                  <SafetyOutlined className="p-3 text-blue-500! text-2xl!" />
                </div>
                <div>
                  <p className="pt-1 text-[14px] text-black/50 font-semibold">
                    Status
                  </p>
                  <p className="pt-1 text-[14px] text-gray-500 font-semibold">
                    Set Supplier Status
                  </p>
                </div>

                {/* input */}
                <div className="flex gap-5 ps-15">
                  <label className="flex gap-2 items-center">
                    <input
                      type="radio"
                      name="status"
                      value="ACTIVE"
                      checked={status === "ACTIVE"}
                      onChange={(e) => setStatus(e.target.value)}
                      defaultChecked
                      className="w-4 h-4 accent-blue-500"
                    />
                    <Tag
                      color="success"
                      className="rounded-full text-[14px] font-medium cursor-pointer"
                    >
                      Active
                    </Tag>
                  </label>

                  <label className="flex gap-2 items-center">
                    <input
                      type="radio"
                      name="status"
                      value="INACTIVE"
                      checked={status === "INACTIVE"}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-4 h-4 accent-red-500"
                    />
                    <Tag
                      color="error"
                      className="rounded-full text-[14px] font-medium cursor-pointer"
                    >
                      Inactive
                    </Tag>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Skeleton>
    </div>
  );
};

export default AddSupplier;
