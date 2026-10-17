import React, { useState, useEffect } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import searchicon from "../assets/icons/search.svg";
import calendarIcon from "../assets/icons/calendarIcon.svg";
import reactIcon from "../assets/icons/reactIcon.svg";
import javaIcon from "../assets/icons/java-icon.svg";
import javaScriptIcon from "../assets/icons/javaScript-icon.svg";
import sqlIcon from "../assets/icons/sql-icon.svg";
import pythonIcon from "../assets/icons/pythonIcon.svg";
import nodeJSicon from "../assets/icons/nodeJSicon.svg";
import mongodbIcon from "../assets/icons/mongodb-icon.svg";
import { DatePicker, Spin, Skeleton, Popover } from "antd";
import {
  PlusCircleOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import SelectBox from "../components/common/SelectBox";
import MultiSelectBox from "../components/common/MultiSelectBox";
import "./CheckList.css";

function MyTodoTask() {
  const [Ankit] = useAutoAnimate();

  const createEmptyRow = () => ({
    firstName: "",
    middleName: "",
    technology: {
      value: "",
      label: "",
      image: "",
    },
    assignees: [],
    date: new Date(),
  });

  const [personalTaskData, setPersonalTaskData] = useState([]);

  const [formData, setFormData] = useState(createEmptyRow());

  // personalTaskData update
  const handleInputChange = (index, field, value) => {
    setPersonalTaskData((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };

  // formData update
  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addNewRow = () => {
    const { firstName, middleName, technology } = formData;

    if (!firstName.trim() || !middleName.trim() || !technology.value) {
      return;
    }

    setPersonalTaskData((prev) => [
      ...prev,
      {
        // id: crypto.randomUUID(),
        id: crypto.randomUUID().slice(0, 8),
        firstName,
        middleName,
        technology,
        ...formData, // baki ke fields
      },
    ]);

    setFormData(createEmptyRow());
  };

  ///////////////////////////////////////////////////////////////

  // for select Box start
  const [selectedLabel, setSelectedLabel] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [optionsShow, setOptionsShow] = useState(false);
  const [arrowOptionsRotate, setArrowOptionsRotate] = useState(false);

  const [openTechBoxIndex, setOpenTechBoxIndex] = useState(null);
  // for select Box end

  // assignee start
  const [openAssigneeBoxIndex, setOpenAssigneeBoxIndex] = useState(null);
  const [openAssignee, setOpenAssignee] = useState(false);
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  console.log("asc4", selectedAssignees);
  // assignee end

  const listData = [
    { label: "Java", value: "asc1", image: javaIcon },
    { label: "JavaScript", value: "asc2", image: javaScriptIcon },
    { label: "React", value: "asc3", image: reactIcon },
    { label: "Python", value: "asc4", image: pythonIcon },
    { label: "Node", value: "asc5", image: nodeJSicon },
    { label: "MongoDB", value: "asc6", image: mongodbIcon },
    { label: "SQL", value: "asc7", image: sqlIcon },
  ];

  const demoTodoData = [
    {
      id: "1",
      firstName: "Ankit",
      middleName: "Singh",
      technology: {
        label: "React",
        value: "tech1",
        image: reactIcon,
      },
      assignees: [
        {
          assigneeName: "Rahul",
          assigneeId: "asc3",
          image: reactIcon,
        },
        {
          assigneeName: "Shalini",
          assigneeId: "asc4",
          image: pythonIcon,
        },
      ],
      date: new Date(),
    },
    {
      id: "2",
      firstName: "Rohit",
      middleName: "Sharma",
      technology: {
        label: "Java",
        value: "tech2",
        image: javaIcon,
      },
      assignees: [
        {
          assigneeName: "Ankit",
          assigneeId: "asc1",
          image: javaIcon,
        },
      ],
      date: new Date(),
    },
    {
      id: "3",
      firstName: "Virat",
      middleName: "Kohli",
      technology: {
        label: "Node",
        value: "tech3",
        image: nodeJSicon,
      },
      assignees: [
        {
          assigneeName: "Ashu",
          assigneeId: "asc2",
          image: javaScriptIcon,
        },
        {
          assigneeName: "Ritika",
          assigneeId: "asc6",
          image: mongodbIcon,
        },
        {
          assigneeName: "Sahil",
          assigneeId: "asc7",
          // image: sqlIcon,
        },
        {
          assigneeName: "Ankit",
          assigneeId: "asc1",
          image: javaIcon,
        },
      ],
      date: new Date(),
    },
  ];

  useEffect(() => {
    setPersonalTaskData(demoTodoData);
  }, []);

  const avatarColors = [
    { bg: "#ECFDF5", color: "#047857" }, // green
    { bg: "#EFF6FF", color: "#1D4ED8" }, // blue
    { bg: "#FEF3C7", color: "#B45309" }, // amber
    { bg: "#F3E8FF", color: "#7E22CE" }, // purple
    { bg: "#FDF2F8", color: "#BE185D" }, // pink
  ];

  return (
    <div ref={Ankit}>
      <p className="pt-3">My Personal ToDo Tasks</p>

      {personalTaskData.map((item, index) => {
        const avatarColor = avatarColors[index % avatarColors.length];
        return (
          <div
            className="flex gap-2 pt-5"
            key={item.id}
            style={{ marginBottom: "10px" }}
            id="task-input"
          >
            <Popover
              title=""
              trigger="click"
              arrow={false}
              placement="bottom"
              open={openAssigneeBoxIndex === index}
              onOpenChange={(open) => {
                setOpenAssigneeBoxIndex(open ? index : null);
              }}
              classNames={{
                root: "ascSelectBo-x",
                container: "p-0! bg-(--popup-bg)! rounded-xl!",
                content: "",
              }}
              content={
                <MultiSelectBox
                  listData={listData}
                  optionImage="image"
                  optionLabel="assigneeName"
                  optionValue="assigneeId"
                  searchFields={["assigneeName", "assigneeId"]}
                  //////
                  selectedValues={item?.assignees || []}
                  onSelect={(selectedItem) => {
                    const assignees = item.assignees || [];

                    const exists = assignees.some(
                      (x) => x.assigneeId === selectedItem.assigneeId,
                    );

                    handleInputChange(
                      index,
                      "assignees",
                      exists
                        ? assignees.filter(
                            (x) => x.assigneeId !== selectedItem.assigneeId,
                          )
                        : [...assignees, selectedItem],
                    );
                  }}
                  style={{ width: "20rem", position: "unset" }}
                />
              }
            >
              <PlusCircleOutlined
                className="ps-3 text-2xl pointer"
                onClick={() => {
                  setOpenAssigneeBoxIndex(index);
                }}
              />
            </Popover>

            {/* assignee shows */}
            <div className="flex items-center w-26">
              {item.assignees.slice(0, 3).map((assi, assiIndex) => (
                <div
                  key={assi.assigneeId}
                  className="userImgAvtar"
                  style={{
                    marginLeft: assiIndex === 0 ? 0 : "-13px",
                    background: avatarColor.bg,
                    color: avatarColor.color,
                  }}
                  title={assi.assigneeName}
                >
                  {assi.image ? (
                    <img src={assi.image} className="userImgAvtar" />
                  ) : (
                    <p className="">
                      {assi.assigneeName.charAt(0).toUpperCase()}
                    </p>
                  )}
                </div>
              ))}

              {item.assignees.length > 3 && (
                <div className="userImgAvtar" style={{ marginLeft: "-13px" }}>
                  +{item.assignees.length - 3}
                </div>
              )}
            </div>
            {/* assignee shows end */}

            <input
              type="text"
              placeholder="First Name"
              className="ps-2 checklistInput"
              value={item.firstName}
              onChange={(e) =>
                handleInputChange(index, "firstName", e.target.value)
              }
            />

            <input
              type="text"
              placeholder="Middle Name"
              className="ps-2 checklistInput"
              value={item.middleName}
              onChange={(e) =>
                handleInputChange(index, "middleName", e.target.value)
              }
            />

            <div className="ps-2 checklistInput">
              <Popover
                title=""
                trigger="click"
                arrow={false}
                placement="bottom"
                open={openTechBoxIndex === index}
                onOpenChange={(open) => {
                  setOpenTechBoxIndex(open ? index : null);
                }}
                classNames={{
                  root: "ascSelectBo-x",
                  container: "p-0! bg-(--popup-bg)! rounded-xl!",
                  content: "",
                }}
                content={
                  <SelectBox
                    listData={listData}
                    optionImage="image"
                    optionLabel="label"
                    optionValue="value"
                    searchFields={["label", "value"]}
                    ////////
                    selectedValue={item.technology.value}
                    onSelect={(item) => {
                      // handleInputChange(index, "technology", item.label);
                      handleInputChange(index, "technology", item);
                      setOpenTechBoxIndex(null);
                    }}
                    style={{ width: "20rem", position: "unset" }}
                  />
                }
              >
                <input
                  type="text"
                  // disabled
                  readOnly
                  className=""
                  placeholder="Enter your Technology"
                  value={item?.technology?.label}
                  onClick={() => {
                    setOpenTechBoxIndex(index);
                  }}
                />
              </Popover>
            </div>

            <div className="flex gap-2 font-bold pointer">
              <p
                className="font-bold text-red-500 ps-3"
                onClick2={() => {
                  setPersonalTaskData((prev) =>
                    prev.filter((x) => x.id !== item.id),
                  ); // id se delete
                  setPersonalTaskData((prev) =>
                    prev.filter((_, i) => i !== index),
                  ); // index se delete
                }}
                onClick={() => {
                  let data = [...personalTaskData];
                  data.splice(index, 1);
                  setPersonalTaskData(data);
                }}
              >
                <CloseOutlined className="" />
              </p>
            </div>
          </div>
        );
      })}

      {/* static Fields start */}
      <div className="flex gap-2 pt-5" style={{ marginBottom: "10px" }}>
        <Popover
          title=""
          trigger="click"
          arrow={false}
          placement="bottom"
          classNames={{
            root: "ascSelectBo-x",
            container: "p-0! bg-(--popup-bg)! rounded-xl!",
            content: "",
          }}
          content={
            <MultiSelectBox
              listData={listData}
              optionImage="image"
              optionLabel="assigneeName"
              optionValue="assigneeId"
              searchFields={["assigneeName", "assigneeId"]}
              //////////
              // selectedValues={selectedAssignees}
              selectedValues={formData.assignees}
              onSelect2={(item) => {
                setSelectedAssignees((prev) => {
                  const exists = prev.some(
                    (x) => x.assigneeId === item.assigneeId,
                  );

                  if (exists) {
                    return prev.filter((x) => x.assigneeId !== item.assigneeId);
                  }

                  return [...prev, item];
                });
              }}
              onSelect={(selectedItem) => {
                const assignees = formData.assignees || [];

                const exists = assignees.some(
                  (x) => x.assigneeId === selectedItem.assigneeId,
                );

                handleFormChange(
                  "assignees",
                  exists
                    ? assignees.filter(
                        (x) => x.assigneeId !== selectedItem.assigneeId,
                      )
                    : [...assignees, selectedItem],
                );
              }}
              style={{ width: "20rem", position: "unset" }}
            />
          }
        >
          <PlusCircleOutlined
            className="ps-3 text-2xl pointer"
            onClick={() => {
              setOpenAssignee(!openAssignee);
            }}
          />
        </Popover>

        <input
          type="text"
          placeholder="First Name"
          className="ps-2 checklistInput"
          value={formData?.firstName}
          onChange={(e) => handleFormChange("firstName", e.target.value)}
        />

        <input
          type="text"
          placeholder="Middle Name"
          className="ps-2 checklistInput"
          value={formData?.middleName}
          onChange={(e) => handleFormChange("middleName", e.target.value)}
        />

        <div className="ps-2 checklistInput">
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
                        <div className="borderBottom" key={item.value}>
                          <div
                            className={
                              selectedValue === item.value
                                ? "selectedItem pointer my-1 me-1 ps-3 p-2"
                                : "optionsItem pointer my-1 me-1 ps-3 p-2"
                            }
                            onClick={() => {
                              setSearchValue("");
                              setSelectedLabel(item.label);
                              setSelectedValue(item.value);
                              setOptionsShow(false);
                              // handleFormChange("technology", item.value);
                              setFormData((prev) => ({
                                ...prev,
                                // technology: item.value,
                                technology: item,
                              }));
                            }}
                          >
                            <img
                              src={item.image}
                              alt=""
                              className="option-img"
                            />
                            <span className="px-2 truncate">{item.label}</span>
                            {selectedValue === item.value && (
                              <span className="ms-auto pe-2">
                                <CheckOutlined />
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  {/* Display a message when no search are found */}
                  {/* <NoData
                    listData={listData}
                    searchValue={searchValue}
                    filterParameters={listData.map(
                      (x) => `${x.label} ${x.value}`,
                    )}
                  /> */}
                </div>
              </div>
            }
          >
            <div>
              <label className="asc-top-label labelText hidden">
                Technology
              </label>
              <input
                type="text"
                // disabled
                readOnly
                className=""
                placeholder="Enter your Technology"
                value={formData?.technology?.label}
                onClick={() => {
                  setOptionsShow(true);
                }}
              />
            </div>
          </Popover>

          {/* <span className="warningTxt ps-2">
            {warning && !technology && "Please fill your technology!"}
          </span> */}
        </div>

        <div className="flex gap-2 font-bold pointer ps-3">
          <button className="pointer" onClick={addNewRow}>
            <CheckOutlined className="text-green-500" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyTodoTask;
