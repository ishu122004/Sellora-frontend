//store categories
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async function () {
    const res = await api.get("/categories");
    return res.data;
  }
);

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async function (category) {
    const res = await api.post("/categories", category);
    return res.data;
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async function ({ id, category }) {
    const res = await api.put(`/categories/${id}`, category);
    return res.data;
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async function (id) {
    await api.delete(`/categories/${id}`);
    return id;
  }
);

const initialState = {
  categories: [],
  loading: false,
  error: null
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })

      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(
          (category) => category._id === action.payload._id
        );

        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })

      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload
        );
      });
  }
});

export default categorySlice.reducer;