//this is where axios communicates with your backend
// React
//  ↓
// api.js
//  ↓
// Express API
//  ↓
// MongoDB
// import axios from "axios";
// import { auth } from "../firebase/firebaseConfig";

// const api = axios.create({
//   baseURL: "http://localhost:3000/api"
// });

// api.interceptors.request.use(async (config) => {
//   const user = auth.currentUser;

//   if (user) {
//     const token = await user.getIdToken();

//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export default api;
import axios from "axios";
import { auth } from "../firebase/firebaseConfig";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://sellora-backend-dsox.onrender.com/api",
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;