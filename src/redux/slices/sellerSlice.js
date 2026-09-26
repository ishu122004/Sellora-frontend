//stores seller related state
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchSeller = createAsyncThunk(
  "seller/fetchSeller",
  async function (uid) {
    const res = await api.get(`/users/${uid}`);
    return res.data;
  }
);

export const fetchSellerStats = createAsyncThunk(
  "seller/fetchSellerStats",
  async function (uid) {
    const res = await api.get(`/sellers/${uid}/dashboard`);
    return res.data;
  }
);

const initialState = {
  seller: null,
  stats: {
    totalProducts: 0,
    totalOrders: 0,
    totalSales: 0,
    pendingOrders: 0
  },
  loading: false,
  error: null
};

const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    clearSeller: (state) => {
      state.seller = null;
      state.stats = {
        totalProducts: 0,
        totalOrders: 0,
        totalSales: 0,
        pendingOrders: 0
      };
    }
  },
  extraReducers: (build) => {
    build
      .addCase(fetchSeller.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.seller = action.payload;
      })
      .addCase(fetchSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchSellerStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellerStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchSellerStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { clearSeller } = sellerSlice.actions;

export default sellerSlice.reducer;