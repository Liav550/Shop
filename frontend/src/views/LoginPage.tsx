import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Input,
  InputLabel,
} from "@mui/material";
import { useAuth } from "../contexts/useAuth";
import { NavLink, useNavigate } from "react-router-dom";
import { colorPalette } from "../utils/consts";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode, type JwtPayload } from "jwt-decode";

const LoginPage = () => {
  const { login, token, rememberMe, setRemember, googleLogin } = useAuth();
  const navigate = useNavigate();

  if (token && localStorage.getItem("rememberMe") === "true") {
    navigate("/products");
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(
        (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value,
        (e.currentTarget.elements.namedItem("password") as HTMLInputElement)
          .value
      );

      navigate("/products"); // This will be the home page in the future
    } catch (err) {
      // could show an error toast here
      console.error("Login failed", err);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box
        component={"form"}
        onSubmit={onSubmit}
        sx={{
          border: "1px solid",
          borderColor: "black",
          borderRadius: "2%",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          gap: "1rem",
          width: "25rem",
        }}
      >
        <h2>Log In</h2>
        <FormControl>
          <InputLabel htmlFor="email">Email address</InputLabel>
          <Input id="email" type="email" required />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input id="password" type="password" required />
        </FormControl>
        <Box display="flex" flexDirection="row">
          <Box flexGrow={1}>
            <Checkbox
              id="rememberMe"
              onClick={() => setRemember(!rememberMe)}
              value={rememberMe}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </Box>
          <Box
            flexGrow={1}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            Don't have an account? &nbsp;{" "}
            <NavLink to="/register">Sign Up</NavLink>
          </Box>
        </Box>
        <Box display={"flex"} flexDirection={"row"} gap={"1rem"}>
          <Button
            sx={{
              flexGrow: 1,
              backgroundColor: colorPalette.brown,
              color: "black",
            }}
            type="submit"
          >
            Submit
          </Button>

          <GoogleLogin
            onSuccess={async (credentials) => {
              try {
                const googleUser: JwtPayload = jwtDecode(
                  credentials.credential!
                );
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                await googleLogin((googleUser as any).email, googleUser.sub!);
                navigate("/products");
              } catch (error) {
                console.error("Google login failed", error);
              }
            }}
          ></GoogleLogin>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
