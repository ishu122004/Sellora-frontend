//contains all routes
import { Routes, Route } from "react-router-dom";

import Home from "../pages/public/Home";
import Products from "../pages/public/Products";
import ProductDetails from "../pages/public/ProductDetails";

import Header from "../components/common/Header";

import SellerHeader from "../components/seller/SellerHeader";
import SellerSidebar from "../components/seller/SellerSidebar";
import SellerDashboard from "../pages/seller/SellerDashboard";
import SellerProducts from "../pages/seller/SellerProducts";
import AddProduct from "../pages/seller/AddProduct";
import SellerOrders from "../pages/seller/SellerOrders";


import AdminHeader from "../components/admin/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProducts from "../pages/admin/Products";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

import Wishlist from "../pages/customer/Wishlist";
import Orders from "../pages/customer/Orders";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes({ user, role }) {
  console.log("ROLE:", role);

  return (
    <>
      {role === "customer" && <Header user={user} />}

      {role === "seller" && (
        <>
          <SellerHeader user={user} />
          <SellerSidebar />
        </>
      )}

      {role === "admin" && (
        <>
          <AdminHeader user={user} />
          <AdminSidebar />
        </>
      )}

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Auth */}
        <Route
          path="/login"
          element={
            <ProtectedRoute user={user} guestOnly>
              <Login />
            </ProtectedRoute>
          }
        />

        <Route
          path="/register"
          element={
            <ProtectedRoute user={user} guestOnly>
              <Register />
            </ProtectedRoute>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute user={user} guestOnly>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reset-password"
          element={
            <ProtectedRoute user={user} guestOnly>
              <ResetPassword />
            </ProtectedRoute>
          }
        />

        {/* Customer */}
        <Route
          path="/orders"
          element={
            <ProtectedRoute user={user}>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute user={user}>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        {/* Seller */}
        <Route
          path="/seller"
          element={
            <ProtectedRoute user={user}>
              <SellerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seller/products"
          element={
            <ProtectedRoute user={user}>
              <SellerProducts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seller/products/add"
          element={
            <ProtectedRoute user={user}>
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seller/orders"
          element={
            <ProtectedRoute user={user}>
              <SellerOrders />
            </ProtectedRoute>
          }
        />

    

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute user={user}>
              <AdminProducts />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default AppRoutes;
