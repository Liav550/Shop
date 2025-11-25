import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { NavBar } from "../components/NavBar";

const AdminPrivateRoute = () => {
  const { user } = useAuth();
  return user?.role === "admin" ? (
    <>
      <NavBar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );
};

export { AdminPrivateRoute };
