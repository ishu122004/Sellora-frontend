//stores wishlist products
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import { auth } from "../../firebase/firebaseConfig";

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async () => {
    const res = await api.get(`/wishlist/${auth.currentUser.uid}`);
    return res.data.products;
  }
);

export const addWishlist = createAsyncThunk(
  "wishlist/addWishlist",
  async (product) => {
    const res = await api.post("/wishlist", {
      user: auth.currentUser.uid,
      productId: product._id
    });

    return res.data.products;
  }
);

export const removeWishlist = createAsyncThunk(
  "wishlist/removeWishlist",
  async (productId) => {
    const res = await api.delete(
      `/wishlist/${auth.currentUser.uid}/${productId}`
    );

    return res.data.products;
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    products: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(addWishlist.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(removeWishlist.fulfilled, (state, action) => {
        state.products = action.payload;
      });
  }
});

export default wishlistSlice.reducer;