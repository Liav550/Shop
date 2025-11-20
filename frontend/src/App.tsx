import { Box } from "@mui/material";
import { colorPalette } from "./utils/consts";
import LoginPage from "./views/LoginPage";
import { AuthProvider } from "./contexts/useAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Box bgcolor={colorPalette.darkBege}>
          <LoginPage />
        </Box>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
