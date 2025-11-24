import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { NavBar } from "../components/NavBar";

const UserPrivateRoutes = () => {
  const { token } = useAuth();
  return token ? (
    <>
      <NavBar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default UserPrivateRoutes;
