"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import NextImage from "next/image";
import { Tooltip, Skeleton, Tag, Popover, Empty } from "antd";
import {
  PlusCircleOutlined,
  CarryOutOutlined,
  HolderOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import Header from "@/src/layouts/Header";
import Footer from "@/src/layouts/Footer";
import "./DragAndDrop.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import {
  addStatus,
  fetchAllStatus,
  deleteStatusById,
  addTask,
  fetchAllTask,
  updateTaskById,
  updateAllMultiTasks,
  deleteTaskById,
} from "@/src/redux/actions/taskAction";
import { useSelector, useDispatch } from "react-redux";
import binIcon from "@/src/assets/icons/trash.svg";
import TaskModal from "./TaskModal";
import { AddButton } from "@/src/components/buttons/GlobalButtons";
import WarningPopup from "@/src/components/dialogs/WarningPopup";
import useDeviceType from "@/src/layouts/useDeviceType";

const DragAndDrop = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const deviceType = useDeviceType();
  const [Ankit] = useAutoAnimate();
  const deleteRef = useRef(null);

  const isMobileView = deviceType === "mobileView";

  const isTODO = "9a0475fd-e20c-408d-8a4f-ef65329c4696";
  const isPROGRESS = "9c79fe12-a6fe-4a3a-8621-dfe1672c2d28";
  const isCOMPLETE = "f059def2-2c39-4ffe-8f05-db610cf8dcd2";

  // Drag-End start from here 👇.
  const [movedItems, setMovedItems] = useState([]);

  const handleDragEnd = (result) => {
    // if (!result.destination) return;
    if (!result.destination) {
      console.log("Task was dropped outside any droppable area.");
      return;
    }

    const { source, destination } = result;

    // only for Log the dragged item👇
    const draggedTask = allStatusData
      .flatMap((column) => column.tasks)
      .find((task) => task.taskId === result.draggableId);

    console.log("Dragged Item Details:", draggedTask);
    console.log("Source Dragged Column ID From:", source.droppableId);
    console.log("Source Dragged Index:", source.index);
    console.log("Destination Dropped Column ID To:", destination.droppableId);
    console.log("Destination Dropped Index:", destination.index);
    // only for Log the dragged item👆

    // If task is moved within the same column ✍️.
    if (source.droppableId === destination.droppableId) {
      // const tempMainBox = [...allStatusData];
      const tempMainBox = allStatusData.map((column) => ({
        ...column,
        tasks: [...column.tasks],
      }));

      // Find source data columns
      const sourceColumn = tempMainBox.find(
        (column) => column.statusId === source.droppableId,
      );
      // Remove the task from the source column
      const [removedTask] = sourceColumn.tasks.splice(source.index, 1);

      // Add task to destination column
      sourceColumn.tasks.splice(destination.index, 0, removedTask);

      // only for Log which items changed their position within the same column👇
      setMovedItems([
        {
          taskId: removedTask.taskId,
          taskName: removedTask.taskName,
          fromColumn: source.droppableId,
          fromIndex: source.index, // Real index in source column.
          toColumn: destination.droppableId,
          toIndex: destination.index, // Real index in destination column.
        },
      ]);

      // Updated all tasks in both source and destination columns below
      const finalList = [];
      sourceColumn.tasks.map((item, index) => {
        finalList.push({
          taskName: item.taskName,
          taskId: item?.taskId,
          statusId: source.droppableId,
          indexPosition: index + 1,
        });
      });
      // only for Log which items changed their position within the same column👆

      setAllStatusData(tempMainBox);
      console.log("All Data:", tempMainBox);
      console.log("only moved Task:", movedItems);
      sendPayload(finalList);
      console.log("asc finalList", finalList);
    }

    // If task is moved between multiple columns ✍️.
    else {
      // const tempMainBox = [...allStatusData];
      const tempMainBox = allStatusData.map((column) => ({
        ...column,
        tasks: [...column.tasks],
      }));

      // Find source data columns
      const sourceColumn = tempMainBox.find(
        (column) => column.statusId === source.droppableId,
      );
      // Find destination columns
      const destColumn = tempMainBox.find(
        (column) => column.statusId === destination.droppableId,
      );
      // Remove the task from the source column
      const [removedTask] = sourceColumn.tasks.splice(source.index, 1);

      // Add task to destination column
      destColumn.tasks.splice(destination.index, 0, removedTask);

      // only for Log which items changed their position across the column👇
      setMovedItems([
        {
          taskId: removedTask.taskId,
          taskName: removedTask.taskName,
          fromColumn: source.droppableId,
          fromIndex: source.index, // Real index in source column.
          toColumn: destination.droppableId,
          toIndex: destination.index, // Real index in destination column.
        },
      ]);

      // Updated all tasks in both source and destination columns below
      const finalList = [];
      destColumn.tasks.map((item, index) => {
        finalList.push({
          taskName: item.taskName,
          taskId: item?.taskId,
          statusId: destination.droppableId,
          indexPosition: index + 1,
        });
      });

      sourceColumn.tasks.map((item, index) => {
        finalList.push({
          taskName: item.taskName,
          taskId: item?.taskId,
          statusId: source.droppableId,
          indexPosition: index + 1,
        });
      });
      // only for Log which items changed their position across the column👆

      setAllStatusData(tempMainBox);
      console.log("All Data:", tempMainBox);
      console.log("only moved Task 33:", movedItems);
      sendPayload(finalList);
      console.log("asc finalList 33", finalList);
    }
  };

  const sendPayload = (data) => {
    console.log("asc payload", data);
    data.forEach((item) => {
      delete item.taskName;
      delete item.id;
    });
    console.log("asc final payload:", data);
    dispatch(updateAllMultiTasks(data));
  };
  // Drag-End end from above👆.

  // with states and all things below.
  const fetchAllStatusRes = useSelector(
    (state) => state.task.fetchAllStatusRes,
  );

  const fetchAllTaskRes = useSelector((state) => state.task.fetchAllTaskRes);

  const updateTaskByIdRes = useSelector(
    (state) => state.task.updateTaskByIdRes,
  );

  const updateAllMultiTasksRes = useSelector(
    (state) => state.task.updateAllMultiTasksRes,
  );

  const deleteTaskByIdRes = useSelector(
    (state) => state.task.deleteTaskByIdRes,
  );

  const addTaskRes = useSelector((state) => state.task.addTaskRes);
  const addStatusRes = useSelector((state) => state.task.addStatusRes);

  const deleteStatusByIdRes = useSelector(
    (state) => state.task.deleteStatusByIdRes,
  );

  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [allStatusData, setAllStatusData] = useState([]);
  const [statusName, setStatusName] = useState("");
  const [statusID, setStatusID] = useState("");

  const [allTaskName, setAllTaskName] = useState([]);
  const [taskID, setTaskID] = useState("");
  const [deleteBoxOpen, setDeleteBoxOpen] = useState(false);
  const [taskModelShow, setTaskModelShow] = useState(false);
  const [modalFunction, setModalFunction] = useState();

  // asc cancel popup start
  const [cancelPopupShow, setCancelPopupShow] = useState(false);
  const handleClose = () => setCancelPopupShow(false);

  const handleYes = () => {
    dispatch(deleteStatusById(statusID));
    setCancelPopupShow(false);
  };
  const [typeInScreen, setTypeInScreen] = useState("");
  // asc cancel popup end

  useEffect(() => {
    dispatch(fetchAllStatus());
    dispatch(fetchAllTask());
  }, [
    dispatch,
    updateTaskByIdRes,
    updateAllMultiTasksRes,
    deleteTaskByIdRes,
    addTaskRes,
    deleteStatusByIdRes,
    addStatusRes,
  ]);

  useEffect(() => {
    if (fetchAllStatusRes?.status === true) {
      setAllStatusData(fetchAllStatusRes?.data);
      setLoading(false);
    }
  }, [fetchAllStatusRes]);

  useEffect(() => {
    if (fetchAllTaskRes?.status === true) {
      setAllStatusData((prev) =>
        prev.map((prev) => ({
          ...prev,
          tasks: prev.tasks.map((task) => {
            const matchedTask = fetchAllTaskRes.data.find(
              (item) => item.taskId === task.taskId,
            );

            return {
              ...task,
              messages: matchedTask?.messages ?? [],
            };
          }),
        })),
      );
    }
  }, [fetchAllTaskRes, fetchAllStatusRes]);

  useEffect(() => {
    if (id) {
      setTaskModelShow(true);
      setModalFunction("update");
      setTaskID(id);
    }
  }, [id]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch(addStatus(statusName));
      setStatusName("");
    }
  };

  const getStatusStyle = (statusId) => {
    if (statusId === isTODO) {
      return {
        color: "#2563EB",
        backgroundColor: "#DBEAFE",
        borderColor: "#DBEAFE",
      };
    } else if (statusId === isPROGRESS) {
      return {
        color: "#D97706",
        backgroundColor: "#FEF3C7",
        borderColor: "#FEF3C7",
      };
    } else if (statusId === isCOMPLETE) {
      return {
        color: "#16A34A",
        backgroundColor: "#DCFCE7",
        borderColor: "#DCFCE7",
      };
    } else {
      return {
        color: "#9333EA",
        backgroundColor: "#F3E8FF",
        borderColor: "#F3E8FF",
      };
    }
  };

  const isNoData = allStatusData.every(
    (column) =>
      column.tasks?.filter((x) =>
        x.taskName?.toLowerCase().includes(searchValue.toLowerCase()),
      ).length === 0,
  );

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (deleteRef.current && !deleteRef.current.contains(e.target)) {
        setDeleteBoxOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const statusOrder = [
    "Backlog",
    "Progress",
    "Technical Review",
    "Approved",
    "Completed",
  ];

  return (
    <div className="">
      <Header
        setQuery={setSearchValue}
        placeholder={"Search..."}
        showProductsCategory={false}
        leftComponent={
          <div className="leftComponentCss">
            <p className="text-[#5CAF90] font-medium text-[18px]">
              {/* You are in Products list */}
            </p>
          </div>
        }
      />

      {taskModelShow && (
        <TaskModal
          open={taskModelShow}
          onCancel={() => setTaskModelShow(false)}
          // onOk={handleYes}
          keyboard={false}
          taskModelShow={taskModelShow}
          setTaskModelShow={setTaskModelShow}
          modalFunction={modalFunction}
          setModalFunction={setModalFunction}
          statusName={statusName}
          setStatusName={setStatusName}
          statusID={statusID}
          setStatusID={setStatusID}
          taskID={taskID || id}
          setTaskID={setTaskID}
        />
      )}

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

      {/* add status start */}
      <div className="ps-1 p-5 pb-1 hidden">
        <div className="flex flex-wrap gap-3">
          <div className="w-full sm:w-58">
            <input
              type="text"
              className="asc-Normal-Input h-10!"
              placeholder="Add Status Name"
              value={statusName}
              onChange={(e) => {
                setStatusName(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
          </div>

          <AddButton
            disabled={statusName === ""}
            className="customAddCss w-full! sm:w-45! h-10!"
            label={"Add Status"}
            onClick={() => {
              dispatch(addStatus(statusName));
              setStatusName("");
            }}
          />
        </div>
      </div>
      {/* add status end */}

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="overflow-auto pt-8">
          <Skeleton active loading={loading} paragraph={{ rows: 6 }}>
            <div
              className="dragDropWrapper p-3"
              style={{ pointerEvents: isMobileView ? "none" : "" }}
            >
              {[...allStatusData]
                // .sort((a, b) => a.indexPosition - b.indexPosition)
                ?.sort((a, b) => {
                  return (
                    statusOrder.indexOf(a.statusName) -
                    statusOrder.indexOf(b.statusName)
                  );
                })
                ?.map((column, index) => {
                  const isTodo = isTODO === column.statusId;
                  const isProgress = isPROGRESS === column.statusId;
                  const isComplete = isCOMPLETE === column.statusId;
                  ///////////////////////////////
                  const isProtectedStatus =
                    isTODO === column.statusId ||
                    isPROGRESS === column.statusId ||
                    isCOMPLETE === column.statusId;
                  return (
                    <Droppable
                      droppableId={column.statusId}
                      key={column.statusId}
                    >
                      {(provider, snapshot) => (
                        <div
                          ref={provider.innerRef}
                          {...provider.droppableProps}
                          // className="single-column-wrapper p-3"
                          className={`single-column-wrapper p- ${
                            snapshot.isDraggingOver ? "isDraggingOver" : ""
                          }`}
                        >
                          {/* column header area */}
                          <div
                            className="flex gap-1 column-header-box p-3"
                            style={getStatusStyle(column.statusId)}
                          >
                            <CarryOutOutlined
                              className={`p-3 rounded-full ${
                                isTodo
                                  ? " bg-blue-200!"
                                  : isProgress
                                    ? " bg-amber-200!"
                                    : isComplete
                                      ? " bg-green-200!"
                                      : " bg-purple-200!"
                              }`}
                            />

                            <p className="mb-0">{column.statusName}</p>

                            <span className="flex gap-1">
                              <Tooltip
                                title="Add Task"
                                color={getStatusStyle(column.statusId).color}
                                classNames={{
                                  container: "text-white!",
                                }}
                              >
                                <PlusCircleOutlined
                                  style={{ fontSize: "22px" }}
                                  className="pointer"
                                  onClick={() => {
                                    setStatusID(column.statusId);
                                    setStatusName(column.statusName);
                                    setTaskModelShow(true);
                                    setModalFunction("add");
                                    console.log("asc22", column.statusName);
                                  }}
                                />
                              </Tooltip>

                              {!isProtectedStatus && (
                                <Popover
                                  content={
                                    <div
                                      className="flex gap-1 pointer"
                                      onClick={() => {
                                        // dispatch(deleteStatusById(column.statusId));
                                        setCancelPopupShow(true);
                                        setStatusID(column.statusId);
                                      }}
                                    >
                                      <NextImage
                                        src={binIcon}
                                        alt=""
                                        className="pointer"
                                        width={14}
                                      />
                                      <p className="text-sm text-red-500">
                                        Delete status
                                      </p>
                                    </div>
                                  }
                                >
                                  <MoreOutlined className="text-xl! pointer" />
                                </Popover>
                              )}
                            </span>
                          </div>

                          {/* column droppable area */}
                          <div className="column-droppable-area pointer-events-auto">
                            {column.tasks
                              ?.filter(
                                (x) =>
                                  x.taskName
                                    ?.toLowerCase()
                                    .includes(searchValue.toLowerCase()) ||
                                  x.taskName
                                    ?.toLowerCase()
                                    .includes(searchValue.toLowerCase()),
                              )
                              ?.map((item, index) => {
                                return (
                                  <Draggable
                                    draggableId={item.taskId}
                                    key={item.taskId}
                                    index={index}
                                  >
                                    {(provider, snapshot) => (
                                      <div
                                        ref={provider.innerRef}
                                        {...provider.draggableProps}
                                        // {...provider.dragHandleProps}
                                        className={`drag-items-box mt-3 ${
                                          snapshot.draggingOver
                                            ? "draggingOver"
                                            : ""
                                        }`}
                                      >
                                        <div
                                          className="taskitemsDiv relative"
                                          style={{
                                            pointerEvents: isMobileView
                                              ? "none"
                                              : "",

                                            borderLeft: `12px solid ${getStatusStyle(column.statusId).borderColor}`,
                                          }}
                                        >
                                          <div
                                            className="taskitems p-3 mb-0 flex gap-2 items-center"
                                            onContextMenu={(e) => {
                                              e.preventDefault();
                                              setDeleteBoxOpen(true);
                                              setTaskID(item.taskId);
                                            }}
                                            onClick={(e) => {
                                              setTaskID(item.taskId);
                                              setStatusID(column.statusId);
                                              setStatusName(column.statusName);
                                              setTaskModelShow(true);
                                              setModalFunction("update");
                                              console.log(
                                                "asc222",
                                                column.statusName,
                                              );
                                            }}
                                          >
                                            {/* 👇 Drag from Icon */}
                                            <HolderOutlined
                                              {...provider.dragHandleProps}
                                              className="mt-1 text-gray-500 cursor-grab!"
                                            />
                                            {/* 👇 Task Content */}
                                            <div className="text-left flex-1">
                                              <p>{item.taskName}</p>
                                              <Tag
                                                // color={}
                                                className="mt-3!"
                                                style={{
                                                  ...getStatusStyle(
                                                    column.statusId,
                                                  ),
                                                  borderRadius: "999px",
                                                  fontWeight: 600,
                                                  padding: "2px 10px",
                                                }}
                                              >
                                                {`${item?.messages?.length ?? "Loading"} Messages`}
                                              </Tag>
                                            </div>
                                          </div>

                                          {deleteBoxOpen &&
                                            taskID === item.taskId && (
                                              <div
                                                ref={deleteRef}
                                                className="deleteTask pointer"
                                                onClick={() => {
                                                  dispatch(
                                                    deleteTaskById(item.taskId),
                                                  );
                                                }}
                                              >
                                                <NextImage
                                                  src={binIcon}
                                                  alt=""
                                                  width={14}
                                                />
                                              </div>
                                            )}
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                );
                              })}
                            {column.tasks?.filter((x) =>
                              x.taskName
                                ?.toLowerCase()
                                .includes(searchValue.toLowerCase()),
                            ).length === 0 && (
                              <div className="mt-5">
                                <Empty
                                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                                  description={
                                    searchValue
                                      ? "No matching tasks"
                                      : "No Tasks"
                                  }
                                />
                              </div>
                            )}
                            {provider.placeholder}
                          </div>
                        </div>
                      )}
                    </Droppable>
                  );
                })}
            </div>
            {/* {isNoData && (
              <div className="flex justify-center py-8">
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No Tasks Found"
                />
              </div>
            )} */}
          </Skeleton>
        </div>
      </DragDropContext>

      <Footer visibilityHeight={100} showProgress={true} />
    </div>
  );
};

export default DragAndDrop;
