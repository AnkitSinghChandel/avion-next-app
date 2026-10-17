import React, { useState } from "react";
import "../../styles/SelectBox.css";
import ASC22 from "../../assets/images/ASC22.jpg";
import searchicon from "../../assets/icons/search.svg";
import { CheckOutlined } from "@ant-design/icons";
import NoData from "./NoData";
import reactIcon from "../../assets/icons/reactIcon.svg";
import javaIcon from "../../assets/icons/java-icon.svg";
import javaScriptIcon from "../../assets/icons/javaScript-icon.svg";
import sqlIcon from "../../assets/icons/sql-icon.svg";
import pythonIcon from "../../assets/icons/pythonIcon.svg";
import nodeJSicon from "../../assets/icons/nodeJSicon.svg";
import mongodbIcon from "../../assets/icons/mongodb-icon.svg";

const UserPopup = ({ selectedValues, onSelect, className, style }) => {
  const listData = [
    { assigneeName: "Ankit", assigneeId: "asc1", image: javaIcon },
    { assigneeName: "Ashu", assigneeId: "asc2", image: javaScriptIcon },
    { assigneeName: "Rahul", assigneeId: "asc3", image: reactIcon },
    { assigneeName: "Shalini", assigneeId: "asc4", image: pythonIcon },
    { assigneeName: "Ankur", assigneeId: "asc5", image: nodeJSicon },
    { assigneeName: "Ritika", assigneeId: "asc6", image: mongodbIcon },
    { assigneeName: "Sahil", assigneeId: "asc7", image: "" },
  ];

  const [searchValue, setSearchValue] = useState("");
  // console.log("asc select box props", props);

  return (
    <div className={`ascSelectBox px-1 pb-2 ${className}`} style={style}>
      <p className="text-gray-500 text-xs text-end pb-2 pe-3">
        Selected ({selectedValues.length}) / ({listData.length})
      </p>
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
          ?.filter((x) =>
            x.assigneeName?.toLowerCase().includes(searchValue.toLowerCase()),
          )
          ?.map((item, index) => {
            const isSelected = selectedValues.some(
              (x) => x?.assigneeId === item?.assigneeId,
            );
            return (
              <div key={item.assigneeId}>
                <div
                  id="task-input"
                  className={
                    isSelected
                      ? "selectedItem pointer my-1 me-1 ps-3 p-2"
                      : "optionsItem pointer my-1 me-1 ps-3 p-2"
                  }
                  onClick={() => {
                    setSearchValue("");
                    onSelect(item);
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly
                    className="me-2"
                    style={{ accentColor: "#2563EB" }}
                  />

                  {item?.image ? (
                    <img src={item?.image} alt="" className="option-img" />
                  ) : (
                    <span className="option-abbr">AS</span>
                  )}
                  <span className="px-2">{item?.assigneeName}</span>
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
            (x) => `${x?.assigneeName} ${x?.assigneeId}`,
          )}
        />
      </div>
    </div>
  );
};

export default UserPopup;
