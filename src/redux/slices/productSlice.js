//stores product related state
//products selected product loading error
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";//createAsyncThunk used to connect api request with redux toolkit.used to do api call
// import api from "../../services/api";
// export const fetchproducts=createAsyncThunk('products/fetchproducts',async function(){
//     const res=await api.get("/products")
//     return res.data
    
// })//fetdata for get data from api 
// const initialState={
//     products:[],//initial state property
//     loading:false,
//     error:null
// }
// const productSlice=createSlice({  //product related redux state
//     name:"product",//store key
//     initialState,
//     reducers:{
//         // setproduct:(state,action)=>{
//         //     state.products=action.payload
//         // }

//     },extraReducers:(build)=>{
//         build.addCase(fetchproducts.pending,(state)=>{
//             state.loading=true
//             console.log('loading...')  
//         }).addCase(fetchproducts.fulfilled,(state,action)=>{
//             state.loading=false
//             state.products=action.payload //state update
//         }).addCase(fetchproducts.rejected,(state,action)=>{
//             state.loading=false
//             state.error=action.error.message
//         })
//     }
// })  //productSlice for use data ,store and manage the data like container in redux state from fetch data
// export default productSlice.reducer

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchproducts = createAsyncThunk(
  "products/fetchproducts",
  async function () {
    const res = await api.get("/products");
    return res.data;
  }
);

export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async function (id) {
    const res = await api.get(`/products/${id}`);
    return res.data;
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async function (product) {
    const res = await api.post("/products", product);
    return res.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async function ({ id, product }) {
    const res = await api.put(`/products/${id}`, product);
    return res.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async function (id) {
    await api.delete(`/products/${id}`);
    return id;
  }
);

export const fetchSellerProducts = createAsyncThunk(
  "products/fetchSellerProducts",
  async function (uid) {
    const res = await api.get(`/products/seller/${uid}`);
    return res.data;
  }
);

const initialState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    }
  },
  extraReducers: (build) => {
    build
      .addCase(fetchproducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchproducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchproducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload);
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );

        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
      })

      .addCase(fetchSellerProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchSellerProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { clearSelectedProduct } = productSlice.actions;

export default productSlice.reducer;


