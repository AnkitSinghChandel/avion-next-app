import React, { useState } from "react";
import "../../styles/SelectBox.css";
import ASC22 from "../../assets/images/ASC22.jpg";
import searchicon from "../../assets/icons/search.svg";
import { CheckOutlined } from "@ant-design/icons";
import NoData from "./NoData";

const SelectBox = ({
  listData = [],
  optionImage,
  searchFields,
  optionLabel,
  optionValue,
  ////////
  onSelect,
  selectedValue,
  className,
  style,
}) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <div className={`ascSelectBox px-1 pb-2 ${className}`} style={style}>
        <div className="selectBoxInput px-2 mx-2">
          <img src={searchicon} className="ascSearchicon" alt="Search Icon" />
          <input
            type="text"
            autoFocus={true}
            className="ps-2 placeholder-gray-600 ascSearchInput w-full"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        </div>

        <div className="selectBoxOptions" id="ascScroll">
          {listData
            ?.filter((item) =>
              searchFields.some((field) =>
                String(item[field] ?? "")
                  .toLowerCase()
                  .includes(searchValue.toLowerCase()),
              ),
            )
            ?.map((item, index) => {
              return (
                <div>
                  <div
                    key={index}
                    className={
                      selectedValue === item[optionValue]
                        ? "selectedItem pointer my-1 me-1 ps-3 p-2"
                        : "optionsItem pointer my-1 me-1 ps-3 p-2"
                    }
                    onClick={() => {
                      setSearchValue("");
                      onSelect(item);
                    }}
                  >
                    {optionImage && (
                      <img
                        src={item[optionImage]}
                        alt=""
                        className="option-img"
                      />
                    )}
                    <span className="px-2">{item[optionLabel]}</span>
                    {selectedValue === item[optionValue] && (
                      <span className="ms-auto pe-2">
                        <CheckOutlined />
                      </span>
                    )}
                  </div>
                  <div className="borderBottom" />
                </div>
              );
            })}

          {/* Display a message when no search are found */}
          <NoData
            listData={listData}
            searchValue={searchValue}
            filterParameters={listData.map(
              (x) => `${x[optionLabel]} ${x[optionValue]}`,
            )}
          />
        </div>
      </div>
    </>
  );
};

export default SelectBox;
