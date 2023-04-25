import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoutes = () => {
  const { loggedIn } = useAuth();

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
