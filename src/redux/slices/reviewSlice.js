//stores reviews
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async function (productId) {
    const res = await api.get(`/reviews/product/${productId}`);
    return res.data;
  }
);

export const createReview = createAsyncThunk(
  "reviews/createReview",
  async function (review) {
    const res = await api.post("/reviews", review);
    return res.data;
  }
);

export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async function (id) {
    await api.delete(`/reviews/${id}`);
    return id;
  }
);

const initialState = {
  reviews: [],
  loading: false,
  error: null
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(createReview.fulfilled, (state, action) => {
        state.reviews.unshift(action.payload);
      })

      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(
          (review) => review._id !== action.payload
        );
      });
  }
});

export default reviewSlice.reducer;