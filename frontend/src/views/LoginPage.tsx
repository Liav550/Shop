import { Box, Button, FormControl, Input, InputLabel } from "@mui/material";
import { useAuth } from "../contexts/useAuth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

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
          width: "20rem",
          height: "15rem",
        }}
      >
        <h2>Log In</h2>
        <FormControl>
          <InputLabel htmlFor="email" required>
            Email address
          </InputLabel>
          <Input id="email" type="email" />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="password" required>
            Password
          </InputLabel>
          <Input id="password" type="password" />
        </FormControl>
        <Button sx={{ border: "1px solid black" }} type="submit">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
