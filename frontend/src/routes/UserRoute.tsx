import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

const UserPrivateRoutes = () => {
  const { token } = useAuth();
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default UserPrivateRoutes;
