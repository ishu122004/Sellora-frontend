//checks seller permission 
// Seller?
//  ↓
// YES → Seller Dashboard
// NO  → Home
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SellerRoute() {
  const { user } = useSelector((state) => state.auth);

  return user?.role === "seller" ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
}