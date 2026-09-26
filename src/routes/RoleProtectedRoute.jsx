import { Navigate } from "react-router-dom";

function RoleProtectedRoute({ user, role, allowedRole, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RoleProtectedRoute;