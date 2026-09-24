//store customer orders
// import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
// import api from "../../services/api";

// export const fetchOrders=createAsyncThunk(//fetchOrders used to get order from api
//     'orders/fetchOrders',   //its action type prefix for this thunk
//     async ()=>{      //orders->slice,fetchOrders->action name it call  when dispatch
//         const res=await api.get('/orders')
//         return res.data   //data from  backend
//     }
// )
// const initialState={
//     orders:[],
//     loading:false,
//     error:null
// }
// const OrderSlice=createSlice({
//     name:"order",
//     initialState,
//     reducers:{},
//     extraReducers:(build)=>{
//         build.addCase(fetchOrders.pending,(state)=>{
//             state.loading=true
//         }).addCase(fetchOrders.fulfilled,(state,action)=>{
//             state.loading=false
//             state.orders=action.payload
//         }).addCase(fetchOrders.rejected,(state,action)=>{
//             state.loading=false
//             state.error=action.error.message
//         })
//     }
// })
// export default OrderSlice.reducer

// Redux Toolkit uses this fetchOrders name to identify the different states of your API request.

// When you call:

// dispatch(fetchOrders());

// Redux Toolkit internally creates:

// orders/fetchOrders/pending
//         ↓
// orders/fetchOrders/fulfilled
//         ↓
// orders/fetchOrders/rejected

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async function () {
    const res = await api.get("/orders");
    return res.data;
  }
);

export const fetchOrder = createAsyncThunk(
  "orders/fetchOrder",
  async function (id) {
    const res = await api.get(`/orders/${id}`);
    return res.data;
  }
);

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async function (order) {
    const res = await api.post("/orders", order);
    return res.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async function ({ id, status }) {
    const res = await api.put(`/orders/${id}`, { status });
    return res.data;
  }
);

export const fetchSellerOrders = createAsyncThunk(
  "orders/fetchSellerOrders",
  async function (uid) {
    const res = await api.get(`/orders/seller/${uid}`);
    return res.data;
  }
);

const initialState = {
  orders: [],
  selectedOrder: null,
  loading: false,
  error: null
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    }
  },
  extraReducers: (build) => {
    build
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.unshift(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id
        );

        if (index !== -1) {
          state.orders[index] = action.payload;
        }

        if (state.selectedOrder?._id === action.payload._id) {
          state.selectedOrder = action.payload;
        }
      })

      .addCase(fetchSellerOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchSellerOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { clearSelectedOrder } = orderSlice.actions;

export default orderSlice.reducer;