import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../hooks/AuthContexts/AuthContexts";
import Loader from "../sharedItems/Loader/Loader";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  //  Only allow admin user
  const adminEmail = "admin@projuktisheba.com";

  if (!user || user.email !== adminEmail) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
