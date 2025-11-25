import { Box } from "@mui/material";
import { colorPalette } from "./utils/consts";
import LoginPage from "./views/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserPrivateRoute } from "./routes/UserRoute";
import CartPage from "./views/CartPage";
import Home from "./views/Home";
import { RegisterPage } from "./views/RegisterPage";
import { AdminPrivateRoute } from "./routes/AdminRoute";
import AdminPage from "./views/AdminPage";

function App() {
  return (
    <Box sx={{ bgcolor: colorPalette.bege, minHeight: "100vh" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route element={<UserPrivateRoute />}>
            <Route path="/products" element={<Home />} />
            <Route path="/cart" element={<CartPage />}></Route>
          </Route>
          <Route element={<AdminPrivateRoute />}>
            <Route path="/admin" element={<AdminPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
