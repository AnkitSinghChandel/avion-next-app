import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import axiosInstance from "@/src/utils/axiosInstance";
const axios = axiosInstance;

import {
  API_URL,
  SINGLE_UPLOAD_TO_S3,
  MULTIPLE_UPLOAD_TO_S3,
} from "../constants/commonType";

export const singleUploadToS3 =
  (files, OnProgressToast) => async (dispatch) => {
    let formData = new FormData();
    formData.append("files", files);

    try {
      const axiosWithoutAuth = axios.create();
      const response = await axios({
        method: "put",
        // url: `${API_URL}/api/Files/UploadToS3`,
        url: `https://basic_dev_api.spire.solutions/api/Files/UploadToS3`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,

        onUploadProgress: (event) => {
          const percent = Math.round((event.loaded * 100) / event.total);
          // OnProgressToast(percent); // progress callback

          // 100 ko yahin rok do jab tak API RES === true na ho jaye 👇
          OnProgressToast(percent >= 100 ? 99 : percent);
        },
      });

      // REAL completion yahan hai jab API RES === true ho jaye 👇
      OnProgressToast(100);

      dispatch({
        type: SINGLE_UPLOAD_TO_S3,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch({
        type: SINGLE_UPLOAD_TO_S3,
        payload: error?.response?.data,
      });
    }
  };

export const multipleUploadToS3 =
  (files, OnProgressToast) => async (dispatch) => {
    let formData = new FormData();

    files?.map((item) => {
      formData.append("files", item);
    });

    try {
      const axiosWithoutAuth = axios.create();
      const response = await axios({
        method: "put",
        // url: `${API_URL}/api/Files/UploadToS3`,
        url: `https://basic_dev_api.spire.solutions/api/Files/UploadToS3`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,

        onUploadProgress: (event) => {
          const percent = Math.round((event.loaded * 100) / event.total);
          // OnProgressToast(percent); // progress callback

          // 100 ko yahin rok do jab tak API RES === true na ho jaye 👇
          OnProgressToast(percent >= 100 ? 99 : percent);
        },
      });

      // REAL completion yahan hai jab API RES === true ho jaye 👇
      OnProgressToast(100);

      dispatch({
        type: MULTIPLE_UPLOAD_TO_S3,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch({
        type: MULTIPLE_UPLOAD_TO_S3,
        payload: error?.response?.data,
      });
    }
  };
