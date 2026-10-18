"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
import "./AddTeam.css";
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
import {
  addTeam,
  fetchTeamByid,
  updateTeamByid,
} from "@/src/redux/actions/teamAction";
import { RESET_API_STATE } from "@/src/redux/constants/teamType";
import { useSelector, useDispatch } from "react-redux";
// import AntDatePicker from "../../datePicker/AntDatePicker";
import { DatePicker, Spin, Skeleton, Popover } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { CurrencyInput } from "@/src/components/common/CurrencyInput";
import MyPhoneInput from "@/src/components/phoneNumber/MyPhoneInput2";
import isPhoneValid from "@/src/components/phoneNumber/isPhoneValid";

import toast from "@/src/components/notification/CustomToast";
import moment from "moment";
import NoData from "@/src/components/common/NoData";
import {
  AddButton,
  CancelButton,
  SubmitButton,
} from "@/src/components/buttons/GlobalButtons";

const AddTeam = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();

  console.log("param", params.id);
  const isUpdating = Boolean(params.id);
  const [Ankit] = useAutoAnimate();

  const addTeamRes = useSelector((state) => state.team.addTeamRes);
  const { loading, data, error } = useSelector(
    (state) => state.team.addTeamRes,
  );
  const fetchTeambyidRes = useSelector((state) => state.team.fetchTeambyidRes);
  const updateTeambyidRes = useSelector(
    (state) => state.team.updateTeambyidRes,
  );
  console.log("asc23", fetchTeambyidRes);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [validemail, setValidemail] = useState(false);
  const [password, setPassword] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [technology, setTechnology] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [devsPrice, setDevsPrice] = useState("");
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

  // for Add Team start👇.
  useEffect(() => {
    // if (addTeamRes.status === true) {
    if (addTeamRes.data) {
      setShowLoader(false);

      toast.success({ description: `${firstName} Added successfully` });
      router.push("/teams");

      dispatch({
        type: RESET_API_STATE,
        payload: "addTeamRes",
      });
    }

    if (addTeamRes.error) {
      toast.error({ description: addTeamRes.error });
    } else if (addTeamRes.status === false) {
      toast.error({ description: `Failed to add team ${firstName}` });
    }
  }, [addTeamRes]);

  const isPhoneNumValid = isPhoneValid(phoneNumber);

  // when we add team
  const handleAddTeam = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      creationDate === "" ||
      technology === "" ||
      phoneNumber === "" ||
      !isPhoneNumValid ||
      devsPrice === ""
    ) {
      setWarning(true);
      return false;
    }

    setShowLoader(true);

    dispatch(
      addTeam(
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        devsPrice,
        technology,
        creationDate,
      ),
    );
  };
  // for Add Team end👆.

  // for Update Team start👇.
  useEffect(() => {
    if (params.id) {
      dispatch(fetchTeamByid(params.id));
    }
  }, []);

  useEffect(() => {
    if (fetchTeambyidRes?.data?.status === true) {
      setFirstName(fetchTeambyidRes.data.data.firstName);
      setLastName(fetchTeambyidRes.data.data.lastName);
      setEmail(fetchTeambyidRes.data.data.email);
      setPassword(fetchTeambyidRes.data.data.password);
      setDevsPrice(fetchTeambyidRes.data.data.devsPrice);
      setPhoneNumber(fetchTeambyidRes.data.data.phoneNumber);
      setTechnology(fetchTeambyidRes.data.data.technology);
      setCreationDate(dayjs(fetchTeambyidRes.data.data.creationDate));

      dispatch({
        type: RESET_API_STATE,
        payload: "fetchTeambyidRes",
      });
    }
  }, [fetchTeambyidRes]);

  useEffect(() => {
    if (updateTeambyidRes?.data?.status === true) {
      setShowLoader(false);

      toast.success({ description: `${firstName} Updated successfully` });
      router.push("/teams");

      dispatch({
        type: RESET_API_STATE,
        payload: "updateTeambyidRes",
      });
    }
  }, [updateTeambyidRes]);

  // when we update team
  const handleUpdateTeam = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      creationDate === "" ||
      technology === "" ||
      phoneNumber === "" ||
      !isPhoneNumValid ||
      devsPrice === ""
    ) {
      setWarning(true);
      return false;
    }

    setShowLoader(true);

    dispatch(
      updateTeamByid(
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        devsPrice,
        params.id,
        technology,
        creationDate,
      ),
    );
  };
  // for Update Team end👆.

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
      handleAddTeam();
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
          // disabled={validemail || showLoader}
          disabled={validemail || addTeamRes?.loading}
          // onClick={handleAddTeam}
          onClick={params.id ? handleUpdateTeam : handleAddTeam}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          className="addButton w-full! sm:w-45!"
          extraComponent={
            addTeamRes?.loading ? (
              <div>
                <Spin size="small" className="btn-custom-spin" />
                <span className="px-2">
                  {isUpdating ? "Updating..." : "Adding..."}
                </span>
              </div>
            ) : (
              <div className="flex gap-3 justify-center pe-">
                <img
                  className="icons mx-"
                  src={btnHover ? addicon : doubleUser}
                  alt=""
                />
                {isUpdating ? "Update Team" : "Add Team"}
              </div>
            )
          }
        />
      </div>

      <Skeleton
        active
        loading={fetchTeambyidRes?.loading}
        paragraph={{ rows: 4 }}
        className="sm:p-20"
      >
        <div
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2 m-auto pt-10! lg:w-[9-5%] w-full sm:px-9!"
          style={divWrapperCss}
        >
          <div className="asc-input-container" id="ascNewInput">
            <label className="asc-top-label labelText">First Name</label>
            <input
              type="text"
              // disabled
              className="asc-Normal-Input"
              style={{ border: warning && !firstName && "1px solid #dc3545" }}
              placeholder="Enter your First Name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setTypeInScreen(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
            <br />
            <span className="warningTxt ps-2">
              {warning && !firstName && "Please fill your first name!"}
            </span>
          </div>

          <div className="asc-input-container" id="ascNewInput">
            <label className="asc-top-label labelText">Last Name</label>
            <input
              type="text"
              // disabled
              className="asc-Normal-Input"
              style={{ border: warning && !lastName && "1px solid #dc3545" }}
              placeholder="Enter your Last Name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                setTypeInScreen(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
            <br />
            <span className="warningTxt ps-2">
              {warning && !lastName && "Please fill your last name!"}
            </span>
          </div>

          <div className="asc-input-container" id="ascNewInput">
            <Popover
              title=""
              trigger="click"
              arrow={false}
              placement="bottom"
              // open={optionsShow}
              // onOpenChange={(newOpen) => setOptionsShow(newOpen)}
              classNames={{
                root: "ascSelectBo-x",
                container: "p-0! bg-(--popup-bg)! rounded-xl!",
                content: "",
              }}
              content={
                <div
                  className="ascSelectBox px-1 pb-2 top-[60px]! max-w-full! w-[20rem]!"
                  style={{ position: "unset" }}
                >
                  <div className="selectBoxInput px-2 mx-2">
                    <img
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
                                  ? "selectedItem pointer my-1 me-1 ps-3 p-2"
                                  : "optionsItem pointer my-1 me-1 ps-3 p-2"
                              }
                              onClick={() => {
                                setSearchValue("");
                                setSelectedLabel(item.label);
                                setSelectedValue(item.value);
                                setTechnology(item.label);
                                setOptionsShow(false);
                              }}
                            >
                              <img
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
              style={{ border: warning && !email && "1px solid #dc3545" }}
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setTypeInScreen(e.target.value);
                checkEmailValidation(e);
              }}
              onKeyDown={handleKeyDown}
            />
            <br />
            <span className="warningTxt ps-2">
              {warning && !email && "Please fill your email!"}
              {validemail && "Email is invalid!"}
            </span>
          </div>

          <div className="asc-input-container" id="ascNewInput">
            <label className="asc-top-label labelText">Password</label>
            <input
              type="password"
              disabled={isUpdating}
              className="asc-Normal-Input"
              style={{ border: warning && !password && "1px solid #dc3545" }}
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setTypeInScreen(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
            <br />
            <span className="warningTxt ps-2">
              {warning && !password && "Please fill your password!"}
            </span>
          </div>

          <div className="asc-input-container" id="ascNewInput">
            <label className="asc-top-label labelText">Date</label>
            <DatePicker
              size="large"
              id="asc-date"
              className="asc-Normal-Input outline-0!"
              style={{
                border: warning && !creationDate && "1px solid #dc3545",
              }}
              placeholder="Select a Date"
              // open={calendarOpen}
              value={creationDate}
              defaultValue={new Date()}
              // format={"DD-MM-YYYY"}
              format={{
                format: "DD-MM-YYYY",
                // type: "mask",
              }}
              onChange={(e) => {
                setCreationDate(e);
                setCalendarOpen(false);
              }}
              onKeyDown={handleKeyDown}
              variant="borderless"
              // prefix={<img src={calendarIcon} alt="calendar" />}
              suffixIcon={
                <img
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
              {warning && !creationDate && "Please fill your date!"}
            </span>
          </div>

          <div className="asc-input-container" id="ascNewInput">
            <label className="asc-top-label labelText">Phone Number</label>
            <input
              type="number"
              // disabled
              className="asc-Normal-Input hidden"
              placeholder="Enter your Phone Number"
              style={{
                border: warning && !phoneNumber && "1px solid #dc3545",
              }}
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                setTypeInScreen(e.target.value);
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
                  // setWarning((prev) => ({
                  //   ...prev,
                  //   phoneNumber: "",
                  // }));
                  setTypeInScreen(val);
                }}
                onKeyDown={handleKeyDown}
              />
            </div>
            {/* <br /> */}
            <span className="warningTxt ps-2">
              {warning && !isPhoneNumValid && "Phone Number is not valid!"}
            </span>
          </div>

          <div className="asc-input-container" id="ascNewInput">
            <label className="asc-top-label labelText">Devs Price</label>
            <input
              type="number"
              // disabled
              className="asc-Normal-Input hidden"
              style={{
                border: warning && !devsPrice && "1px solid #dc3545",
              }}
              placeholder="Enter your Price"
              value={devsPrice}
              onChange={(e) => {
                setDevsPrice(e.target.value);
                setTypeInScreen(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
            <CurrencyInput
              className="asc-Normal-Input"
              style={{
                border: warning && !devsPrice && "1px solid #dc3545",
              }}
              placeholder="Enter your Price"
              value={devsPrice}
              onValueChange2={(values) => {
                console.log("values", values);
              }}
              onValueChange={({ value }) => {
                setDevsPrice(value);
                setTypeInScreen(value);
              }}
              onKeyDown={handleKeyDown}
            />
            <br />
            <span className="warningTxt ps-2">
              {warning && !devsPrice && "Please fill your price!"}
            </span>
          </div>
        </div>
      </Skeleton>
    </div>
  );
};

export default AddTeam;
