import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { NavBar } from "../components/NavBar";
import { jwtDecode } from "jwt-decode";

const AdminPrivateRoute = () => {
  const { token } = useAuth();
  const user: { role: string } = jwtDecode(token!);

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
