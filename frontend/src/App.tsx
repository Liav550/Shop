import { Box } from "@mui/material";
import { colorPalette } from "./utils/consts";
import LoginPage from "./views/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductList from "./views/ProductList";
import UserRoute from "./routes/UserRoute";

function App() {
  return (
    <Box bgcolor={colorPalette.bege}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<UserRoute />}>
            <Route path="/products" element={<ProductList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
