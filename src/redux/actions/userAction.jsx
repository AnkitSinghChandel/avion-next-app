import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import axiosInstance from "@/src/utils/axiosInstance";
const axios = axiosInstance;
import { setFunctionData } from "@/src/utils/storage";

import {
  API_URL,
  LOGIN,
  SIGNUP,
  FETCH_USER_BY_ID,
  FETCH_ALL_USERS,
  UPDATE_USER_BY_ID,
  DELETE_USER_BY_ID,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  SIDEBAR_PROPS_API,
} from "../constants/userType";

export const loginApi = (email, password) => async (dispatch) => {
  try {
    const response = await axios({
      method: "post",
      url: `${API_URL}/auth/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email,
        password,
      },
    });

    dispatch({
      type: LOGIN,
      payload: response.data,
    });

    // header data yahi set hoga start
    setFunctionData({ data: "data", data2: "data2" });
    // header data yahi set hoga end

    return response.data;
  } catch (error) {
    console.error(error);
    dispatch({
      type: LOGIN,
      payload: error.response.data,
    });
    throw error;
  }
};

export const signupApi =
  (firstName, lastName, image, email, password, age, role, phoneNumber) =>
  async (dispatch) => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_URL}/auth/signup`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          firstName,
          lastName,
          image,
          email,
          password,
          age,
          role,
          phoneNumber,
        },
      });
      dispatch({
        type: SIGNUP,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch({
        type: SIGNUP,
        payload: error.response.data,
      });
      throw error;
    }
  };

export const fetchUserByid = (userId) => async (dispatch) => {
  try {
    const response = await axios({
      method: "get",
      url: `${API_URL}/users/${userId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
    });
    dispatch({
      type: FETCH_USER_BY_ID,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_USER_BY_ID,
      payload: error.response.data,
    });
    throw error;
  }
};

export const fetchAllUsers = () => async (dispatch) => {
  try {
    const response = await axios({
      method: "get",
      url: `${API_URL}/users`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
    });
    dispatch({
      type: FETCH_ALL_USERS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_ALL_USERS,
      payload: error.response.data,
    });
    throw error;
  }
};

export const updateUserById = (userId, payload) => async (dispatch) => {
  try {
    const response = await axios({
      method: "put",
      url: `${API_URL}/users/${userId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: payload,
    });

    dispatch({
      type: UPDATE_USER_BY_ID,
      payload: response.data,
    });

    // header data yahi set hoga start
    setFunctionData({ data: "update data", data2: "update data2" });
    // header data yahi set hoga end

    return response.data;
  } catch (error) {
    console.error(error);
    dispatch({
      type: UPDATE_USER_BY_ID,
      payload: error.response.data,
    });
    throw error;
  }
};

export const deleteUserById = (userId) => async (dispatch) => {
  try {
    const response = await axios({
      method: "delete",
      url: `${API_URL}/users/${userId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: userId,
    });
    dispatch({
      type: DELETE_USER_BY_ID,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    dispatch({
      type: DELETE_USER_BY_ID,
      payload: error.response.data,
    });
    throw error;
  }
};

export const forgotPassword = (payload) => async (dispatch) => {
  try {
    const response = await axios({
      method: "post",
      url: `${API_URL}/auth/forgot-password`,
      headers: {
        "Content-Type": "application/json",
      },
      data: payload,
    });
    dispatch({
      type: FORGOT_PASSWORD,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    dispatch({
      type: FORGOT_PASSWORD,
      payload: error.response?.data,
    });
    throw error;
  }
};

export const resetPassword = (payload) => async (dispatch) => {
  try {
    const response = await axios({
      method: "post",
      url: `${API_URL}/auth/reset-password`,
      headers: {
        "Content-Type": "application/json",
      },
      data: payload,
    });
    dispatch({
      type: RESET_PASSWORD,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    dispatch({
      type: RESET_PASSWORD,
      payload: error.response?.data,
    });
    throw error;
  }
};

/////////////////////////////////////////////////////////
// ASC REDUX PROPS START //
export const sidebar_Props_API =
  ({ isSidebarOpen, isSidebarOpen2 }) =>
  (dispatch) => {
    dispatch({
      type: SIDEBAR_PROPS_API,
      payload: { isSidebarOpen, isSidebarOpen2 },
    });
  };
// ASC REDUX PROPS END //
