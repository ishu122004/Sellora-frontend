//store customer orders
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchOrders=createAsyncThunk(//fetchOrders used to get order from api
    'orders/fetchOrders',   //its action type prefix for this thunk
    async ()=>{      //orders->slice,fetchOrders->action name it call  when dispatch
        const res=await api.get('/orders')
        return res.data   //data from  backend
    }
)
const initialState={
    orders:[],
    loading:false,
    error:null
}
const OrderSlice=createSlice({
    name:"order",
    initialState,
    reducers:{},
    extraReducers:(build)=>{
        build.addCase(fetchOrders.pending,(state)=>{
            state.loading=true
        }).addCase(fetchOrders.fulfilled,(state,action)=>{
            state.loading=false
            state.orders=action.payload
        }).addCase(fetchOrders.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })
    }
})
export default OrderSlice.reducer

// Redux Toolkit uses this fetchOrders name to identify the different states of your API request.

// When you call:

// dispatch(fetchOrders());

// Redux Toolkit internally creates:

// orders/fetchOrders/pending
//         ↓
// orders/fetchOrders/fulfilled
//         ↓
// orders/fetchOrders/rejected