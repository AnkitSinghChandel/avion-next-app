import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import axiosInstance from "@/src/utils/axiosInstance";
const axios = axiosInstance;

import {
  API_URL,
  // SEND EMAIL
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILURE,

  // SEND OTP EMAIL
  SEND_OTP_EMAIL_REQUEST,
  SEND_OTP_EMAIL_SUCCESS,
  SEND_OTP_EMAIL_FAILURE,

  //VERIFY OTP
  VERIFY_OTP,
} from "../constants/emailType";

export const sendEmail = (payload) => async (dispatch) => {
  try {
    dispatch({ type: SEND_EMAIL_REQUEST });
    const response = await axios({
      method: "post",
      url: `${API_URL}/email/send-email`,
      headers: {
        "Content-Type": "application/json",
      },
      // data: {},
      data: payload,
    });
    dispatch({
      type: SEND_EMAIL_SUCCESS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    dispatch({
      type: SEND_EMAIL_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const sendOTPEmail = (payload) => async (dispatch) => {
  try {
    dispatch({ type: SEND_OTP_EMAIL_REQUEST });
    const response = await axios({
      method: "post",
      url: `${API_URL}/email/send-otp`,
      headers: {
        "Content-Type": "application/json",
      },
      data: payload,
    });
    dispatch({
      type: SEND_OTP_EMAIL_SUCCESS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    dispatch({
      type: SEND_OTP_EMAIL_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const verifyOTP = (payload) => async (dispatch) => {
  try {
    const response = await axios({
      method: "post",
      url: `${API_URL}/auth/verify-otp`,
      headers: {
        "Content-Type": "application/json",
      },
      data: payload,
    });
    dispatch({
      type: VERIFY_OTP,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    dispatch({
      type: VERIFY_OTP,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};
