import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/useAuth.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";

const CLIENT_ID =
  "863929060724-7783tirlk3s42scsljdh0mbpqgtsl8bs.apps.googleusercontent.com";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <AuthProvider>
        <StrictMode>
          <App />
        </StrictMode>{" "}
      </AuthProvider>
    </GoogleOAuthProvider>
  </QueryClientProvider>
);
