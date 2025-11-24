import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/useAuth.tsx";
import { colorPalette } from "./utils/consts";

// apply page background using JS so we don't rely on a separate CSS file
document.body.style.margin = "0";
document.body.style.backgroundColor = colorPalette.bege;
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CartProvider } from "./contexts/useCart.tsx";

const CLIENT_ID =
  "863929060724-7783tirlk3s42scsljdh0mbpqgtsl8bs.apps.googleusercontent.com";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <AuthProvider>
        <CartProvider>
          <StrictMode>
            <App />
          </StrictMode>{" "}
        </CartProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </QueryClientProvider>
);
