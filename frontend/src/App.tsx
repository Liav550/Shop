import { Box } from "@mui/material";
import { colorPalette } from "./utils/consts";
import LoginPage from "./views/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRoute from "./routes/UserRoute";
import CartPage from "./views/CartPage";
import Home from "./views/Home";

function App() {
  return (
    <Box sx={{ bgcolor: colorPalette.bege, minHeight: "100vh" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<UserRoute />}>
            <Route path="/products" element={<Home />} />
            <Route path="/cart" element={<CartPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
