import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function ProtectedRoute({ role, children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!user) {
    // Redirect to /auth (not /login)
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}