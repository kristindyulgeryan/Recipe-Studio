import { Navigate, Outlet, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth.js";

export default function AuthGuard() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  console.log("AuthGuard check:", { isAuthenticated, path: location.pathname });
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
