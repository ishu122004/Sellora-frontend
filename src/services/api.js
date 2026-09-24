//this is where axios communicates with your backend
// React
//  ↓
// api.js
//  ↓
// Express API
//  ↓
// MongoDB
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;