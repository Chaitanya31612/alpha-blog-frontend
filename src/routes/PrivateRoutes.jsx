import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ loggedIn }) => {
  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
