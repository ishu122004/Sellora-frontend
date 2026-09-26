import { Routes, Route } from "react-router-dom";

import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import SellerHeader from "../components/seller/SellerHeader";
import AdminHeader from "../components/admin/AdminHeader";

import Home from "../pages/public/Home";
import Products from "../pages/public/Products";
import ProductDetails from "../pages/public/ProductDetails";
import Categories from "../pages/public/Categories";
import CategoryProducts from "../pages/public/CategoryProducts";
import SearchResults from "../pages/public/SearchResults";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import BecomeSeller from "../pages/auth/BecomeSeller";

import Dashboard from "../pages/customer/Dashboard";
import Cart from "../pages/customer/Cart";
import Wishlist from "../pages/customer/Wishlist";
import Orders from "../pages/customer/Orders";
import OrderDetails from "../pages/customer/OrderDetails";
import Checkout from "../pages/customer/Checkout";
import Payment from "../pages/customer/Payment";
import OrderSuccess from "../pages/customer/OrderSuccess";
import Profile from "../pages/customer/Profile";
import Addresses from "../pages/customer/Addresses";
import AddAddress from "../pages/customer/AddAddress";

import SellerDashboard from "../pages/seller/SellerDashboard";
import SellerProducts from "../pages/seller/SellerProducts";
import AddProduct from "../pages/seller/AddProduct";
import EditProduct from "../pages/seller/EditProduct";
import SellerOrders from "../pages/seller/SellerOrders";
import SellerOrderDetails from "../pages/seller/SellerOrderDetails";
import SellerSales from "../pages/seller/SellerSales";
import SellerReviews from "../pages/seller/SellerReviews";
import SellerProfile from "../pages/seller/SellerProfile";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProducts from "../pages/admin/Products";
import AdminUsers from "../pages/admin/Users";
import AdminUserDetails from "../pages/admin/UserDetails";
import AdminOrders from "../pages/admin/Orders";
import AdminOrderDetails from "../pages/admin/OrderDetails";
import AdminSellers from "../pages/admin/Sellers";
import AdminSellerDetails from "../pages/admin/SellerDetails";
import AdminReviews from "../pages/admin/Reviews";
import AdminCategories from "../pages/admin/Categories";
import AdminProfile from "../pages/admin/AdminProfile";

import ProtectedRoute from "./ProtectedRoute";
import RoleProtectedRoute from "./RoleProtectedRoute";

function AppRoutes({ user, role }) {
  const isSeller = role === "seller";
  const isAdmin = role === "admin";

  return (
    <>
      {isSeller ? (
        <SellerHeader user={user} />
      ) : isAdmin ? (
        <AdminHeader user={user} />
      ) : (
        <Header user={user} role={role} />
      )}

      <Routes>

        {/* ================= PUBLIC ================= */}

        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/categories"
          element={<Categories />}
        />

        {/* Both paths supported because existing UI uses /categories/... */}
        <Route
          path="/category/:category"
          element={<CategoryProducts />}
        />

        <Route
          path="/categories/:category"
          element={<CategoryProducts />}
        />

        <Route
          path="/search"
          element={<SearchResults />}
        />

        {/* ================= AUTH ================= */}

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

        <Route
          path="/become-seller"
          element={
            <ProtectedRoute user={user}>
              <BecomeSeller />
            </ProtectedRoute>
          }
        />

        {/* ================= CUSTOMER ================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard user={user} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute user={user}>
              <Cart />
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

        <Route
          path="/orders"
          element={
            <ProtectedRoute user={user}>
              <Orders user={user} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute user={user}>
              <OrderDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute user={user}>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment"
          element={
            <ProtectedRoute user={user}>
              <Payment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order-success"
          element={
            <ProtectedRoute user={user}>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />

         <Route
  path="/profile"
  element={
    <ProtectedRoute user={user}>
      {isSeller ? (
        <SellerProfile />
      ) : isAdmin ? (
        <AdminProfile user={user} />
      ) : (
        <Profile user={user} />
      )}
    </ProtectedRoute>
  }
/>        

        <Route
          path="/addresses"
          element={
            <ProtectedRoute user={user}>
              <Addresses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/addresses/add"
          element={
            <ProtectedRoute user={user}>
              <AddAddress />
            </ProtectedRoute>
          }
        />

        {/* ================= SELLER ================= */}

        <Route
          path="/seller"
          element={
            <RoleProtectedRoute
              user={user}
              role={role}
              allowedRole="seller"
            >
              <SellerDashboard />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/seller/products"
          element={
            <RoleProtectedRoute
              user={user}
              role={role}
              allowedRole="seller"
            >
              <SellerProducts />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/seller/products/add"
          element={
            <RoleProtectedRoute
              user={user}
              role={role}
              allowedRole="seller"
            >
              <AddProduct />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/seller/products/edit/:id"
          element={
            <RoleProtectedRoute
              user={user}
              role={role}
              allowedRole="seller"
            >
              <EditProduct />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/seller/orders"
          element={
            <RoleProtectedRoute
              user={user}
              role={role}
              allowedRole="seller"
            >
              <SellerOrders />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/seller/orders/:id"
          element={
            <RoleProtectedRoute
              user={user}
              role={role}
              allowedRole="seller"
            >
              <SellerOrderDetails />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/seller/sales"
          element={
            <RoleProtectedRoute
              user={user}
              role={role}
              allowedRole="seller"
            >
              <SellerSales />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/seller/reviews"
          element={
            <RoleProtectedRoute
              user={user}
              role={role}
              allowedRole="seller"
            >
              <SellerReviews />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/seller/profile"
          element={
            <RoleProtectedRoute
              user={user}
              role={role}
              allowedRole="seller"
            >
              <SellerProfile />
            </RoleProtectedRoute>
          }
        />

        {/* ================= ADMIN ================= */}

        <Route
          path="/admin"
          element={
            <RoleProtectedRoute
              user={user}
              role={role}
              allowedRole="admin"
            >
              <AdminDashboard />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <RoleProtectedRoute
              user={user}
              role={role}
              allowedRole="admin"
            >
              <AdminProducts />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin/products/add"
          element={
            <RoleProtectedRoute
              user={user}
              role={role}
              allowedRole="admin"
            >
              <AddProduct admin />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin/products/edit/:id"
          element={
            <RoleProtectedRoute
              user={user}
              role={role}
              allowedRole="admin"
            >
              <EditProduct admin />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <RoleProtectedRoute
              user={user}
              role={role}
              allowedRole="admin"
            >
              <AdminUsers />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin/users/:id"
          element={
            <RoleProtectedRoute
              user={user}
              role={role}
              allowedRole="admin"
            >
              <AdminUserDetails />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <RoleProtectedRoute
              user={user}
              role={role}
              allowedRole="admin"
            >
              <AdminOrders />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin/orders/:id"
          element={
            <RoleProtectedRoute
              user={user}
              role={role}
              allowedRole="admin"
            >
              <AdminOrderDetails />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin/sellers"
          element={
            <RoleProtectedRoute
              user={user}
              role={role}
              allowedRole="admin"
            >
              <AdminSellers />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin/sellers/:id"
          element={
            <RoleProtectedRoute
              user={user}
              role={role}
              allowedRole="admin"
            >
              <AdminSellerDetails />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin/reviews"
          element={
            <RoleProtectedRoute
              user={user}
              role={role}
              allowedRole="admin"
            >
              <AdminReviews />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin/categories"
          element={
            <RoleProtectedRoute
              user={user}
              role={role}
              allowedRole="admin"
            >
              <AdminCategories />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin/profile"
          element={
            <RoleProtectedRoute
              user={user}
              role={role}
              allowedRole="admin"
            >
              <AdminProfile user={user} />
            </RoleProtectedRoute>
          }
        />

        {/* ================= FALLBACK ================= */}

        <Route path="*" element={<Home />} />

      </Routes>

      {!isSeller && !isAdmin && <Footer />}
    </>
  );
}

export default AppRoutes;