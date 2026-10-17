import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import axiosInstance from "@/src/utils/axiosInstance";
const axios = axiosInstance;

import {
  API_URL,
  ADD_STATUS,
  FETCH_ALL_STATUS,
  UPDATE_STATUS_BY_ID,
  DELETE_STATUS_BY_ID,
  ADD_TASK,
  FETCH_ALL_TASK,
  FETCH_TASK_BY_ID,
  UPDATE_TASK_BY_ID,
  DELETE_TASK_BY_ID,
  UPDATE_ALL_MULTI_TASKS,
  SEND_COMMENTS,
  FETCH_COMMENTS_BY_TASK_ID,
} from "../constants/taskType";

export const addStatus = (statusName) => async (dispatch) => {
  try {
    const response = await axios({
      method: "post",
      url: `${API_URL}/status`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        statusName,
      },
    });
    dispatch({
      type: ADD_STATUS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    dispatch({
      type: ADD_STATUS,
      payload: error.response.data,
    });
  }
};

export const fetchAllStatus = () => async (dispatch) => {
  try {
    const response = await axios({
      method: "get",
      url: `${API_URL}/status`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
    });
    dispatch({
      type: FETCH_ALL_STATUS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_ALL_STATUS,
      payload: error.response.data,
    });
  }
};

export const updateStatusById = (statusName, tasks) => async (dispatch) => {
  try {
    const response = await axios({
      method: "post",
      url: `${API_URL}/status`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        statusName,
        tasks,
      },
    });
    dispatch({
      type: UPDATE_STATUS_BY_ID,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    dispatch({
      type: UPDATE_STATUS_BY_ID,
      payload: error.response.data,
    });
  }
};

export const deleteStatusById = (statusId) => async (dispatch) => {
  try {
    const response = await axios({
      method: "delete",
      url: `${API_URL}/status/${statusId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
    });
    dispatch({
      type: DELETE_STATUS_BY_ID,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    dispatch({
      type: DELETE_STATUS_BY_ID,
      payload: error.response.data,
    });
  }
};

export const addTask = (taskName, statusId) => async (dispatch) => {
  try {
    const response = await axios({
      method: "post",
      url: `${API_URL}/tasks`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        taskName,
        statusId,
      },
    });
    dispatch({
      type: ADD_TASK,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    dispatch({
      type: ADD_TASK,
      payload: error.response.data,
    });
  }
};

export const fetchAllTask = () => async (dispatch) => {
  try {
    const response = await axios({
      method: "get",
      url: `${API_URL}/tasks`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
    });
    dispatch({
      type: FETCH_ALL_TASK,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_ALL_TASK,
      payload: error.response.data,
    });
  }
};

export const fetchTaskById = (id) => async (dispatch) => {
  try {
    const response = await axios({
      method: "get",
      url: `${API_URL}/tasks/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
    });
    dispatch({
      type: FETCH_TASK_BY_ID,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_TASK_BY_ID,
      payload: error.response.data,
    });
  }
};

export const updateTaskById =
  (taskId, statusId, indexPosition) => async (dispatch) => {
    try {
      const response = await axios({
        method: "patch",
        url: `${API_URL}/tasks/${taskId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { statusId, indexPosition },
      });
      dispatch({
        type: UPDATE_TASK_BY_ID,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch({
        type: UPDATE_TASK_BY_ID,
        payload: error.response.data,
      });
    }
  };

export const deleteTaskById = (taskId) => async (dispatch) => {
  try {
    const response = await axios({
      method: "delete",
      url: `${API_URL}/tasks/${taskId}`,
      headers: {
        "Content-Type": "application/json",
      },
      // data: {},
    });
    dispatch({
      type: DELETE_TASK_BY_ID,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    dispatch({
      type: DELETE_TASK_BY_ID,
      payload: error.response.data,
    });
  }
};

export const updateAllMultiTasks = (data) => async (dispatch) => {
  try {
    const response = await axios({
      method: "post",
      url: `${API_URL}/tasks/updateManyTasks`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { data },
    });
    dispatch({
      type: UPDATE_ALL_MULTI_TASKS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    dispatch({
      type: UPDATE_ALL_MULTI_TASKS,
      payload: error.response.data,
    });
  }
};

export const sendComments =
  (senderId, receiver, taskId, message, attachments) => async (dispatch) => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_URL}/messages`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { senderId, receiver, taskId, message, attachments },
      });
      dispatch({
        type: SEND_COMMENTS,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch({
        type: SEND_COMMENTS,
        payload: error.response.data,
      });
    }
  };

export const fetchCommentsByTaskId = (id) => async (dispatch) => {
  try {
    const response = await axios({
      method: "get",
      url: `${API_URL}/messages/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
    });
    dispatch({
      type: FETCH_COMMENTS_BY_TASK_ID,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_COMMENTS_BY_TASK_ID,
      payload: error.response.data,
    });
  }
};
