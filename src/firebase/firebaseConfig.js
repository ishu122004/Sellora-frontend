
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBndJxKlyDPWOf6jaZz3isX5sdKsYH-AEI",
  authDomain: "ecommerce-7b0b0.firebaseapp.com",
  projectId: "ecommerce-7b0b0",
  storageBucket: "ecommerce-7b0b0.firebasestorage.app",
  messagingSenderId: "365225142321",
  appId: "1:365225142321:web:770242d55f88714f514d10",
  measurementId: "G-VXJD425F1R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
