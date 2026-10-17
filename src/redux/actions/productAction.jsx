import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import axiosInstance from "@/src/utils/axiosInstance";
const axios = axiosInstance;

import {
  API_URL,
  ADD_PRODUCT,
  FETCH_ALL_PRODUCTS,
  FETCH_PRODUCT_BY_ID,
  UPDATE_PRODUCT_BY_ID,
  DELETE_PRODUCT_BY_ID,
  ADD_REVIEW,
  ADD_TO_CART,
  FETCH_ALL_CART_PRODUCTS,
  ADD_TO_WISHLIST,
  FETCH_ALL_WISHLIST_PRODUCTS,
  DISCOUNT_PROPS_API,
  TIMER_START,
  TIMER_STOP,
  FETCH_TIMER_BY_PRODUCT_ID,
  FETCH_TIMER_BY_PRODUCT_ID_IN_HEADER,
  SET_TIMER_RUNNING_PROPS_API,
  CHECK_PRODUCT_CODE,
} from "../constants/productType";

export const addProduct = (payload) => async (dispatch) => {
  try {
    const response = await axios({
      method: "post",
      url: `${API_URL}/products`,
      headers: {
        "Content-Type": "application/json",
      },
      data: payload,
    });
    dispatch({
      type: ADD_PRODUCT,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    dispatch({
      type: ADD_PRODUCT,
      payload: error.response.data,
    });
    throw error;
  }
};

export const fetchAllProducts = (page, limit, search) => async (dispatch) => {
  try {
    const response = await axios({
      method: "get",
      // url: `${API_URL}/products`,
      url: `${API_URL}/products?page=${page}&limit=${limit}&search=${search}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
    });
    dispatch({
      type: FETCH_ALL_PRODUCTS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_ALL_PRODUCTS,
      payload: error.response.data,
    });
  }
};

export const fetchProductById = (productID) => async (dispatch) => {
  try {
    const response = await axios({
      method: "get",
      url: `${API_URL}/products/${productID}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
    });
    dispatch({
      type: FETCH_PRODUCT_BY_ID,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_PRODUCT_BY_ID,
      payload: error.response.data,
    });
    throw error;
  }
};

export const updateProductById = (productID, payload) => async (dispatch) => {
  try {
    const response = await axios({
      method: "patch",
      url: `${API_URL}/products/${productID}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        ...payload,
      },
    });
    dispatch({
      type: UPDATE_PRODUCT_BY_ID,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    dispatch({
      type: UPDATE_PRODUCT_BY_ID,
      payload: error.response.data,
    });
    throw error;
  }
};

export const deleteProductById = (productID) => async (dispatch) => {
  try {
    const response = await axios({
      method: "delete",
      url: `${API_URL}/products/${productID}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
    });
    dispatch({
      type: DELETE_PRODUCT_BY_ID,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    dispatch({
      type: DELETE_PRODUCT_BY_ID,
      payload: error.response.data,
    });
  }
};

export const addReview = (userId, productId, rating) => async (dispatch) => {
  try {
    const response = await axios({
      method: "post",
      url: `${API_URL}/reviews`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { userId, productId, rating },
    });
    dispatch({
      type: ADD_REVIEW,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    dispatch({
      type: ADD_REVIEW,
      payload: error.response.data,
    });
  }
};

export const addToCart =
  (userId, productId, productQuantity) => async (dispatch) => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_URL}/carts`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { userId, productId, productQuantity },
      });
      dispatch({
        type: ADD_TO_CART,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch({
        type: ADD_TO_CART,
        payload: error.response.data,
      });
    }
  };

export const fetchAllCartProducts = (userId) => async (dispatch) => {
  try {
    const response = await axios({
      method: "get",
      url: `${API_URL}/carts/${userId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
    });
    dispatch({
      type: FETCH_ALL_CART_PRODUCTS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_ALL_CART_PRODUCTS,
      payload: error.response.data,
    });
  }
};

export const addToWishList =
  (userId, productId, productQuantity) => async (dispatch) => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_URL}/wishLists`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { userId, productId },
      });
      dispatch({
        type: ADD_TO_WISHLIST,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch({
        type: ADD_TO_WISHLIST,
        payload: error.response.data,
      });
    }
  };

export const fetchAllWishList = (userId) => async (dispatch) => {
  try {
    const response = await axios({
      method: "get",
      url: `${API_URL}/wishLists/${userId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
    });
    dispatch({
      type: FETCH_ALL_WISHLIST_PRODUCTS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_ALL_WISHLIST_PRODUCTS,
      payload: error.response.data,
    });
  }
};

export const timerStart =
  (userId, productId, isRunning) => async (dispatch) => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_URL}/timers/timerStart`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { userId, productId, isRunning },
      });
      dispatch({
        type: TIMER_START,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch({
        type: TIMER_START,
        payload: error.response.data,
      });
    }
  };

export const timerStop = (userId, productId) => async (dispatch) => {
  try {
    const response = await axios({
      method: "post",
      url: `${API_URL}/timers/timerStop`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { userId, productId },
    });
    dispatch({
      type: TIMER_STOP,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    dispatch({
      type: TIMER_STOP,
      payload: error.response.data,
    });
  }
};

export const fetchTimerByProductId =
  (userId, productId) => async (dispatch) => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_URL}/timers/fetchTimer`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { userId, productId },
      });
      dispatch({
        type: FETCH_TIMER_BY_PRODUCT_ID,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch({
        type: FETCH_TIMER_BY_PRODUCT_ID,
        payload: error.response.data,
      });
    }
  };

export const fetchTimerByProductIdInHeader =
  (userId, productId) => async (dispatch) => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_URL}/timers/fetchTimer`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { userId, productId },
      });
      dispatch({
        type: FETCH_TIMER_BY_PRODUCT_ID_IN_HEADER,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch({
        type: FETCH_TIMER_BY_PRODUCT_ID_IN_HEADER,
        payload: error.response.data,
      });
    }
  };

export const checkProductCode = (productCode) => async (dispatch) => {
  try {
    const response = await axios({
      method: "get",
      url: `${API_URL}/products/code/${productCode}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
    });
    dispatch({
      type: CHECK_PRODUCT_CODE,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    dispatch({
      type: CHECK_PRODUCT_CODE,
      payload: error.response.data,
    });
  }
};

// ASC REDUX PROPS START //
export const discount_Props_API = (discount1, discount2) => (dispatch) => {
  console.log("Dispatching discount data:", discount1, discount2);
  dispatch({
    type: DISCOUNT_PROPS_API,
    payload: { discount1, discount2 },
  });
};

export const setTimerRunning_props_Api = (isRunning, totalTime) => ({
  type: SET_TIMER_RUNNING_PROPS_API,
  payload: {
    isRunning,
    totalTime,
  },
});
// ASC REDUX PROPS END //
