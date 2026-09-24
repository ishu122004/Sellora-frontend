//central redux store .store frontend application state

import { configureStore } from "@reduxjs/toolkit";

import adminReducer from "./slices/adminSlice";
import cartReducer from "./slices/cartSlice";
import categoryReducer from "./slices/categorySlice";
import orderReducer from "./slices/orderSlice";
import productReducer from "./slices/productSlice";
import reviewReducer from "./slices/reviewSlice";
import sellerReducer from "./slices/sellerSlice";
import wishlistReducer from "./slices/wishlistSlice";

const store = configureStore({
  reducer: {
    admin: adminReducer,
    cart: cartReducer,
    category: categoryReducer,
    order: orderReducer,
    product: productReducer,
    review: reviewReducer,
    seller: sellerReducer,
    wishlist: wishlistReducer
  }
});

export default store;