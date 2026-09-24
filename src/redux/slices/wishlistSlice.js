//stores wishlist products
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import api from "../../services/api";
// import { auth } from "../../firebase/firebaseConfig";

// export const fetchWishlist = createAsyncThunk(
//   "wishlist/fetchWishlist",
//   async () => {
//     const res = await api.get(`/wishlist/${auth.currentUser.uid}`);
//     return res.data.products;
//   }
// );

// export const addWishlist = createAsyncThunk(
//   "wishlist/addWishlist",
//   async (product) => {
//     const res = await api.post("/wishlist", {
//       user: auth.currentUser.uid,
//       productId: product._id
//     });

//     return res.data.products;
//   }
// );

// export const removeWishlist = createAsyncThunk(
//   "wishlist/removeWishlist",
//   async (productId) => {
//     const res = await api.delete(
//       `/wishlist/${auth.currentUser.uid}/${productId}`
//     );

//     return res.data.products;
//   }
// );

// const wishlistSlice = createSlice({
//   name: "wishlist",
//   initialState: {
//     products: [],
//     loading: false,
//     error: null
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchWishlist.fulfilled, (state, action) => {
//         state.products = action.payload;
//       })
//       .addCase(addWishlist.fulfilled, (state, action) => {
//         state.products = action.payload;
//       })
//       .addCase(removeWishlist.fulfilled, (state, action) => {
//         state.products = action.payload;
//       });
//   }
// });

// export default wishlistSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async function (uid) {
    const res = await api.get(`/wishlist/${uid}`);
    return res.data;
  }
);

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async function ({ uid, productId }) {
    const res = await api.post("/wishlist", {
      uid,
      productId
    });

    return res.data;
  }
);

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async function ({ uid, productId }) {
    await api.delete(`/wishlist/${uid}/${productId}`);

    return productId;
  }
);

const initialState = {
  products: [],
  loading: false,
  error: null
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })

      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
      });
  }
});

export default wishlistSlice.reducer;