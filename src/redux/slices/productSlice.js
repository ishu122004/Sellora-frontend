//stores product related state
//products selected product loading error
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";//createAsyncThunk used to connect api request with redux toolkit.used to do api call
import api from "../../services/api";
export const fetchproducts=createAsyncThunk('products/fetchproducts',async function(){
    const res=await api.get("/products")
    return res.data
    
})//fetdata for get data from api 
const initialState={
    products:[],//initial state property
    loading:false,
    error:null
}
const productSlice=createSlice({  //product related redux state
    name:"product",//store key
    initialState,
    reducers:{
        // setproduct:(state,action)=>{
        //     state.products=action.payload
        // }

    },extraReducers:(build)=>{
        build.addCase(fetchproducts.pending,(state)=>{
            state.loading=true
            console.log('loading...')  
        }).addCase(fetchproducts.fulfilled,(state,action)=>{
            state.loading=false
            state.products=action.payload //state update
        }).addCase(fetchproducts.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })
    }
})  //productSlice for use data ,store and manage the data like container in redux state from fetch data
export default productSlice.reducer


