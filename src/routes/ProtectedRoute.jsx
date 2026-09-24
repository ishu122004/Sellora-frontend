//checks whether the user is logged in
// Logged in?
//    ↓
// YES → Page
// NO  → Login
import { Navigate } from "react-router-dom";

function ProtectedRoute({ user, children, guestOnly = false }) {
  if (guestOnly && user) {
    return <Navigate to="/" replace />;
  }

  if (!guestOnly && !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;