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
import {
  createAsyncThunk,
  createSlice
} from "@reduxjs/toolkit";

import api from "../../services/api";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/orders");
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.message
      );
    }
  }
);

export const fetchOrder = createAsyncThunk(
  "orders/fetchOrder",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `/orders/${id}`
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.message
      );
    }
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
    },

    clearOrders: (state) => {
      state.orders = [];
      state.error = null;
    }
  },

  extraReducers: (build) => {
    build
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        fetchOrders.fulfilled,
        (state, action) => {
          state.loading = false;
          state.orders = action.payload;
        }
      )

      .addCase(
        fetchOrders.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedOrder = null;
      })

      .addCase(
        fetchOrder.fulfilled,
        (state, action) => {
          state.loading = false;
          state.selectedOrder = action.payload;
        }
      )

      .addCase(
        fetchOrder.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  }
});

export const {
  clearSelectedOrder,
  clearOrders
} = orderSlice.actions;

export default orderSlice.reducer;