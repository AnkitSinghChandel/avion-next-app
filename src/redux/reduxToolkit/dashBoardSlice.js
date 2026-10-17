import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

const axios = axiosInstance;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const addGlobalDiscount = createAsyncThunk(
  "dashBoard/addGlobalDiscount", // type like redux thunk
  async (payloadData, { rejectWithValue }) => {
    try {
      //   const response = await axios.post(`${API_URL}/dashBoard`, payloadData);
      const response = await axios.post("/dashBoard", payloadData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Adding failed");
    }
  },
);

export const getGlobalDiscount = createAsyncThunk(
  "dashBoard/getGlobalDiscount",
  async (userid, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "get",
        url: `${API_URL}/dashBoard/${userid}`,
        headers: {
          "Content-Type": "application/json",
        },
        // data: userid,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

// Slice (Reducer)
const dashBoardSlice = createSlice({
  name: "dashBoard",
  initialState: {
    addGlobalDiscountRes: {
      loading: false,
      data: null,
      error: null,
    },

    fetchGlobalDiscountRes: {
      loading: false,
      data: null,
      error: null,
    },
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      /* ADD GLOBAL-DISCOUNT */
      .addCase(addGlobalDiscount.pending, (state) => {
        state.addGlobalDiscountRes.loading = true;
        state.addGlobalDiscountRes.error = null;
      })
      .addCase(addGlobalDiscount.fulfilled, (state, action) => {
        state.addGlobalDiscountRes.loading = false;
        state.addGlobalDiscountRes.data = action.payload;
        state.addGlobalDiscountRes.error = null;
      })
      .addCase(addGlobalDiscount.rejected, (state, action) => {
        state.addGlobalDiscountRes.loading = false;
        state.addGlobalDiscountRes.error = action.payload;
      })

      /* GET GLOBAL-DISCOUNT */
      .addCase(getGlobalDiscount.pending, (state) => {
        state.fetchGlobalDiscountRes.loading = true;
        state.fetchGlobalDiscountRes.error = null;
      })
      .addCase(getGlobalDiscount.fulfilled, (state, action) => {
        state.fetchGlobalDiscountRes.loading = false;
        state.fetchGlobalDiscountRes.data = action.payload;
        state.fetchGlobalDiscountRes.error = null;
      })
      .addCase(getGlobalDiscount.rejected, (state, action) => {
        state.fetchGlobalDiscountRes.loading = false;
        state.fetchGlobalDiscountRes.error = action.payload;
      });
  },
});

export default dashBoardSlice.reducer;
