import { Box } from "@mui/material";
import { colorPalette } from "./utils/consts";
import LoginPage from "./views/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserPrivateRoute } from "./routes/UserRoute";
import CartPage from "./views/CartPage";
import Home from "./views/HomePage";
import { RegisterPage } from "./views/RegisterPage";
import { AdminPrivateRoute } from "./routes/AdminRoute";
import AdminPage from "./views/AdminPage";
import PreviousOrdersPage from "./views/PreviousOrdersPage";
import { Chat } from "./views/Chat";

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
            <Route path="/orders" element={<PreviousOrdersPage />}></Route>
            <Route path="/chat" element={<Chat />}></Route>
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
