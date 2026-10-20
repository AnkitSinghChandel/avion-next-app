"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import { Button, Flex, Modal } from "antd";
// import Draggable from "react-draggable";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { addTask, fetchTaskById } from "@/src/redux/actions/taskAction";
import {
  ADD_TASK,
  FETCH_TASK_BY_ID,
  FETCH_COMMENTS_BY_TASK_ID,
} from "@/src/redux/constants/taskType";
import { useSelector, useDispatch } from "react-redux";
import TaskEditor from "./TaskEditor";
import Messages from "./Messages";

const TaskModal = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = useParams();
  console.log("params", params.id);
  const [Ankit] = useAutoAnimate();

  const fetchTaskByIdRes = useSelector((state) => state.task.fetchTaskByIdRes);

  const addTaskCommentsRes = useSelector(
    (state) => state.task.addTaskCommentsRes,
  );

  const fetchCommentsByTaskIdRes = useSelector(
    (state) => state.task.fetchCommentsByTaskIdRes,
  );

  const [taskName, setTaskName] = useState("");
  const [warning, setWarning] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.taskID && props.modalFunction === "update") {
      router.push(`/task/task-id/${props.taskID}`);
    }
  }, [router, props.taskID, props.modalFunction]);

  useEffect(() => {
    if (props.taskID && props.modalFunction === "update") {
      dispatch(fetchTaskById(props.taskID || params.id));
    }
  }, [dispatch, props.taskID, params.id, props.modalFunction]);

  useEffect(() => {
    if (fetchTaskByIdRes.status === true) {
      setTaskName(fetchTaskByIdRes.data.taskName);
      setLoading(false);
    }
  }, [fetchTaskByIdRes]);

  const handleAddModel = () => {
    if (taskName === "") {
      setWarning(true);
      return false;
    }

    if (props.modalFunction === "add") {
      dispatch(addTask(taskName, props.statusID));
    } else if (props.modalFunction === "update") {
      // dispatch(updateTask(taskName, props.statusID));
    }
    setShowLoader(true);
    props.setTaskModelShow(false);
  };

  console.log("asc task modal props", props);

  const clearAllDataWhenModalClose = () => {
    console.log("onCancel triggered! Closing modal22");
    props.setTaskModelShow(false);
    props.setTaskID(false);

    dispatch({
      type: FETCH_TASK_BY_ID,
      payload: {},
    });

    dispatch({
      type: FETCH_COMMENTS_BY_TASK_ID,
      payload: {},
    });

    router.push("/task");
  };

  return (
    <div>
      <Modal
        {...props}
        title={props.title}
        centered
        // open={props.open}
        // onCancel={() => props.onCancel()}
        onCancel={() => {
          console.log("onCancel triggered! Closing modal");
          props.onCancel();
          clearAllDataWhenModalClose();
        }}
        onOk={() => props.onOk()}
        // closable={false}
        loading={props.modalFunction === "update" && loading}
        style={{ paddingTop: "3%", paddingBottom: "3%" }}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
        footer={[
          <div className="flex justify-center gap-5 w-full" key="footer">
            <Button
              key="back"
              // onClick={props.onCancel}
              onClick={() => {
                props.onCancel();
                clearAllDataWhenModalClose();
              }}
              className="cancelButton ascButton"
            >
              Cancel
            </Button>

            <Button
              key="submit"
              loading={props.loading}
              className="addButton ascButton"
              onClick={() => {
                handleAddModel();
              }}
            >
              {props.modalFunction === "add" ? "Add Task" : "Update Task"}
            </Button>
          </div>,
        ]}
      >
        <div className="py-4">
          <div className="text-[20px] text-[#212529]">
            Modal &nbsp;{props.statusName} &nbsp;
            {props.modalFunction}
          </div>

          <div className="pt-6">
            <div className="asc-input-container" id="ascNewInput">
              <label className="asc-top-label labelText bg-white!">
                Task Name
              </label>
              <input
                type="text"
                // disabled
                autoFocus={true}
                className="asc-Normal-Input bg-white! text-[#3f4d5a]!"
                style={{
                  border: warning && !taskName && "1.5px solid #dc3545",
                }}
                placeholder="Enter your Task Name"
                value={taskName}
                onChange={(e) => {
                  setTaskName(e.target.value);
                  // setTypeInScreen(e.target.value);
                }}
              />
              <br />
              <span className="warningTxt ps-2">
                {warning && !taskName && "Please fill your task name!"}
              </span>
            </div>

            <TaskEditor
              taskID={props.taskID}
              modalFunction={props.modalFunction}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TaskModal;
