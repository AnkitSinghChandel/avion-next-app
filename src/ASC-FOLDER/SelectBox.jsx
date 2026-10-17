import React, { useState, useEffect, useRef } from "react";
import "../styles/SelectBox.css";
import useClickOutside from "../hooks/useClickOutside";
import moment from "moment";
import DownArrowOption from "../assets/icons/DownArrowOption.svg";
import avion from "../assets/images/avion.png";
import Xicon from "../assets/icons/Xicon.svg";
import searchicon from "../assets/icons/search.svg";
import box from "../assets/images/box(1).png";
import box2 from "../assets/images/box(2).png";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import NoData from "../components/common/NoData";

const SelectBox = () => {
  // const selectBoxPopupRef = useRef(null);
  const [Ankit] = useAutoAnimate();

  const [selectedLabel, setSelectedLabel] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selectBoxShow, setSelectBoxShow] = useState(false);
  const [arrowOptionsRotate, setArrowOptionsRotate] = useState(false);

  const listData = [
    { label: "Java", value: "asc1" },
    { label: "JavaScript", value: "asc2" },
    { label: "React", value: "asc3" },
    { label: "Python", value: "asc4" },
    { label: "Node", value: "asc5" },
    { label: "MongoDB", value: "asc6" },
    { label: "SQL", value: "asc7" },
    { label: "My SQL", value: "asc8" },
  ];

  const selectOptions2 = [
    { firstName: "Ankit", lastName: "Singh", value: "asc1" },
    { firstName: "Ashu", lastName: "Goel", value: "asc2" },
    { firstName: "Shalini", lastName: "Rajput", value: "asc3" },
    { firstName: "Prajwal", lastName: "Bhoyar", value: "asc4" },
    { firstName: "Riya", lastName: "Tyagi", value: "asc5" },
    { firstName: "Ritika", lastName: "Tyagi", value: "asc6" },
    { firstName: "Sarthak", lastName: "Tyagi", value: "asc7" },
    { firstName: "Paras", lastName: "Sanghani", value: "asc8" },
  ];

  // Call the custom hook to handle click outside 👇
  // useClickOutside(selectBoxPopupRef, () => {
  //   setSelectBoxShow(false);
  //   setArrowOptionsRotate(false);
  // });

  return (
    // ASC select box start
    <search-Box-Section>
      <div className="p-5">
        <div
          id="ascTeamSelectBox"
          className="ascInputDiv px-3 flex"
          onClick={() => {
            setSelectBoxShow(!selectBoxShow);
            setArrowOptionsRotate(!arrowOptionsRotate);
          }}
        >
          <p className="mb-0 selectedInput">{selectedLabel || "Select..."}</p>

          {selectedLabel ? (
            <img
              src={Xicon}
              className="xicon pointer"
              alt=""
              onClick={() => {
                setSelectedLabel("");
                setSelectedValue("");
              }}
            />
          ) : (
            <img
              src={DownArrowOption}
              className={arrowOptionsRotate ? "upArrowOpt" : "downArrowOpt"}
              alt=""
              onClick={() => {
                // setSelectBoxShow(!selectBoxShow);
                // setArrowOptionsRotate(!arrowOptionsRotate);
              }}
            />
          )}
        </div>

        {selectBoxShow && (
          <div className="ascSelectBox px-1 pb-2 top-22.5!">
            <div className="selectBoxInput px-2 mx-2">
              <img
                src={searchicon}
                className="ascSearchicon"
                alt="Search Icon"
              />
              <input
                type="text"
                autoFocus={true}
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
                ?.filter(
                  (x) =>
                    x.label
                      ?.toLowerCase()
                      .includes(searchValue.toLowerCase()) ||
                    x.value?.toLowerCase().includes(searchValue.toLowerCase()),
                )
                .map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={
                        selectedValue === item.value
                          ? "selectedItem pointer mb-2 me-1 ps-3 p-1"
                          : "optionsItem pointer mb-2 me-1 ps-3 p-1"
                      }
                      onClick={() => {
                        setSelectedLabel(item.label);
                        setSelectedValue(item.value);
                        setSearchValue("");
                        setSelectBoxShow(false);
                      }}
                    >
                      <img src={avion} alt="" className="option-img" />
                      <span className="px-2">{item.label}</span>
                      {selectedValue === item.value && (
                        <span className="ms-auto pe-2">✔</span>
                      )}
                    </div>
                  );
                })}
              {/* Display a message when no search are found */}
              {listData.length > 0 &&
                listData.filter(
                  (x) =>
                    x.label
                      ?.toLowerCase()
                      .includes(searchValue.toLowerCase()) ||
                    x.value?.toLowerCase().includes(searchValue.toLowerCase()),
                ).length === 0 && (
                  <div className="font-normal text-center text-[#A9A9A9]">
                    No data found!
                    <br />
                    <img src={box} width={45} alt="" className="m-auto" />
                  </div>
                )}

              {/* Display a message when no data to display */}
              {listData.length === 0 && (
                <div className="font-normal text-center text-[#A9A9A9]">
                  No data to display!
                  <br />
                  <img src={box2} width={45} alt="" className="m-auto" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </search-Box-Section>
    // ASC select box end
  );
};

export default SelectBox;
