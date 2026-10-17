import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import axiosInstance from "@/src/utils/axiosInstance";
const axios = axiosInstance;

import {
  API_URL,
  // ADD TEAM
  ADD_TEAM_REQUEST,
  ADD_TEAM_SUCCESS,
  ADD_TEAM_FAILURE,

  // FETCH_TEAM,
  FETCH_TEAM_REQUEST,
  FETCH_TEAM_SUCCESS,
  FETCH_TEAM_FAILURE,

  // DELETE_TEAM
  DELETE_TEAM_REQUEST,
  DELETE_TEAM_SUCCESS,
  DELETE_TEAM_FAILURE,

  // FETCH_TEAM_BY_ID,
  FETCH_TEAM_BY_ID_REQUEST,
  FETCH_TEAM_BY_ID_SUCCESS,
  FETCH_TEAM_BY_ID_FAILURE,

  // UPDATE_TEAM_BY_ID,
  UPDATE_TEAM_BY_ID_REQUEST,
  UPDATE_TEAM_BY_ID_SUCCESS,
  UPDATE_TEAM_BY_ID_FAILURE,

  // TEAMS_GENRATE_PDF,
  TEAMS_GENRATE_PDF_REQUEST,
  TEAMS_GENRATE_PDF_SUCCESS,
  TEAMS_GENRATE_PDF_FAILURE,
} from "../constants/teamType";

export const addTeam =
  (
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    devsPrice,
    technology,
    creationDate,
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADD_TEAM_REQUEST });

      const response = await axios({
        method: "post",
        url: `${API_URL}/teams`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          firstName,
          lastName,
          email,
          password,
          phoneNumber,
          devsPrice,
          technology,
          creationDate,
        },
      });

      dispatch({
        type: ADD_TEAM_SUCCESS,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch({
        type: ADD_TEAM_FAILURE,
        payload: error.response?.data?.error || error.message,
      });
    }
  };

export const fetchAllTeams =
  (searchQuery, technologyQuery, sortBy, page, limit) => async (dispatch) => {
    try {
      dispatch({ type: FETCH_TEAM_REQUEST });

      const response = await axios({
        method: "post",
        // url: `${API_URL}/teams/fetchAllTeam`,
        // url: `${API_URL}/teams?searchText=${searchQuery}`,
        url: `${API_URL}/teams/fetchAllTeam?page=${page}&limit=${limit}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { searchQuery, technologyQuery, sortBy },
      });
      dispatch({
        type: FETCH_TEAM_SUCCESS,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch({
        type: FETCH_TEAM_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

export const deleteTeamById = (teamid) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TEAM_REQUEST });

    const response = await axios({
      method: "delete",
      url: `${API_URL}/teams/${teamid}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { teamid },
    });
    dispatch({
      type: DELETE_TEAM_SUCCESS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    dispatch({
      type: DELETE_TEAM_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const fetchTeamByid = (teamid) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_TEAM_BY_ID_REQUEST });
    const response = await axios({
      method: "get",
      url: `${API_URL}/teams/${teamid}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
    });
    dispatch({
      type: FETCH_TEAM_BY_ID_SUCCESS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_TEAM_BY_ID_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const updateTeamByid =
  (
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    devsPrice,
    teamid,
    technology,
    creationDate,
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_TEAM_BY_ID_REQUEST });

      const response = await axios({
        method: "put",
        url: `${API_URL}/teams/${teamid}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          firstName,
          lastName,
          email,
          password,
          phoneNumber,
          devsPrice,
          technology,
          creationDate,
        },
      });
      dispatch({
        type: UPDATE_TEAM_BY_ID_SUCCESS,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch({
        type: UPDATE_TEAM_BY_ID_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

export const TeamsGeneratePDF = () => async (dispatch) => {
  try {
    dispatch({ type: TEAMS_GENRATE_PDF_REQUEST });
    const response = await axios({
      method: "get",
      url: `${API_URL}/TeamsGeneratePDF`,
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
    });
    if (response.status === 200) {
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(response.data);
      // downloadLink.download = `PO_${ordercode.replace(".", "/")}.pdf`;
      downloadLink.download = "Teams_PDF.pdf";
      downloadLink.click();
    }
    dispatch({
      type: TEAMS_GENRATE_PDF_SUCCESS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    dispatch({
      type: TEAMS_GENRATE_PDF_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
