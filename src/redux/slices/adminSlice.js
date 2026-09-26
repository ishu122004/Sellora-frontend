//stores admin-related state
// stores admin-related state
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchAdminUsers = createAsyncThunk(
  "admin/fetchAdminUsers",
  async function () {
    const res = await api.get("/admin/users");
    return res.data;
  }
);

export const fetchAdminStats = createAsyncThunk(
  "admin/fetchAdminStats",
  async function () {
    const res = await api.get("/admin/dashboard");
    return res.data;
  }
);

export const fetchAdminSellers = createAsyncThunk(
  "admin/fetchAdminSellers",
  async function () {
    const res = await api.get("/admin/sellers");
    return res.data;
  }
);

export const fetchAdminOrders = createAsyncThunk(
  "admin/fetchAdminOrders",
  async function () {
    const res = await api.get("/admin/orders");
    return res.data;
  }
);

const initialState = {
  users: [],
  sellers: [],
  orders: [],
  stats: {
    totalUsers: 0,
    totalSellers: 0,
    totalCustomers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalWishlists: 0,
    totalRevenue: 0,
    recentOrders: []
  },
  loading: false,
  error: null
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchAdminUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchAdminStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchAdminStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchAdminSellers.fulfilled, (state, action) => {
        state.sellers = action.payload;
      })

      .addCase(fetchAdminOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  }
});

export default adminSlice.reducer;