import { Box } from "@mui/material";
import { colorPalette } from "./utils/consts";
import LoginPage from "./views/LoginPage";

function App() {
  return (
    <Box bgcolor={colorPalette.darkBege}>
      <LoginPage />
    </Box>
  );
}

export default App;
