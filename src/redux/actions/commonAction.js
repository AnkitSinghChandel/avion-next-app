/////////////////////////CLOUDINARY_URL//////////////////////
import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import axiosInstance from "@/src/utils/axiosInstance";
const axios = axiosInstance;

import {
  API_URL,
  SINGLE_UPLOAD_TO_S3,
  MULTIPLE_UPLOAD_TO_S3,
} from "../constants/commonType";

export const singleUploadToS3 = (files, onProgress) => async (dispatch) => {
  let formData = new FormData();
  formData.append("file", files);
  formData.append("upload_preset", "avion_upload"); // for CLOUDINARY_URL

  try {
    const axiosWithoutAuth = axios.create();
    const response = await axiosWithoutAuth({
      method: "post",
      url: `https://api.cloudinary.com/v1_1/dlu4uc0ff/auto/upload`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: undefined,
      },
      data: formData,

      onUploadProgress: (event) => {
        const percent = Math.round((event.loaded * 100) / event.total);
        // onProgress(percent); // progress callback

        // 100 ko yahin rok do jab tak API RES === true na ho jaye 👇
        onProgress(percent >= 100 ? 99 : percent);
      },
    });

    // REAL completion yahan hai jab API RES === true ho jaye 👇
    onProgress(100);

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

export const multipleUploadToS3 = (files, onProgress) => async (dispatch) => {
  try {
    let urls = [];

    for (let i = 0; i < files.length; i++) {
      let formData = new FormData();

      formData.append("file", files[i]);
      formData.append("upload_preset", "avion_upload");
      const axiosWithoutAuth = axios.create();
      const response = await axiosWithoutAuth({
        method: "post",
        url: "https://api.cloudinary.com/v1_1/dlu4uc0ff/auto/upload",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,

        onUploadProgress: (event) => {
          const percent = Math.round(
            ((i + event.loaded / event.total) / files.length) * 100,
          );

          onProgress(percent >= 100 ? 99 : percent);
        },
      });

      urls.push(response.data.secure_url);
    }

    onProgress(100);

    dispatch({
      type: MULTIPLE_UPLOAD_TO_S3,
      payload: urls,
    });

    return urls;
  } catch (error) {
    console.error(error);
    dispatch({
      type: MULTIPLE_UPLOAD_TO_S3,
      payload: error?.response?.data,
    });
  }
};
