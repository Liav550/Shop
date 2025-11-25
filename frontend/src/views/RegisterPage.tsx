import { Box, Button, FormControl, Input, InputLabel } from "@mui/material";
import { colorPalette } from "../utils/consts";
import { usePostRequest } from "../hooks/usePostRequest";
import type { LocalLoginProps } from "../utils/types";

const RegisterPage = () => {
  const { mutateAsync: register } = usePostRequest<
    { a: number },
    LocalLoginProps
  >("/login/register");
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = (
      e.currentTarget.elements.namedItem("email") as HTMLInputElement
    ).value;
    const password = (
      e.currentTarget.elements.namedItem("password") as HTMLInputElement
    ).value;
    const confirmPassword = (
      e.currentTarget.elements.namedItem("confirmPassword") as HTMLInputElement
    ).value;

    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    console.log("Register form submitted", {
      email,
      password,
      confirmPassword,
    });

    await register({ email, password, provider: "local" });
  };
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component={"form"}
        onSubmit={onSubmit}
        sx={{
          width: "30%",
          height: "50%",
          border: "1px solid black",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
          gap: "1rem",
        }}
      >
        <h2>Register</h2>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel htmlFor="email">Email address</InputLabel>
          <Input id="email" type="email" required />
        </FormControl>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input id="password" type="password" required />
        </FormControl>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel htmlFor="confirmPassword">Confirm password</InputLabel>
          <Input id="confirmPassword" type="password" required />
        </FormControl>
        <Button
          type="submit"
          sx={{
            bgcolor: colorPalette.brown,
            mt: "auto",
            height: "3rem",
            color: "black",
            width: "90%",
            transition: "all 0.5s ease-in-out",
            "&:hover": {
              opacity: "0.8",
              transition: "all 0.3s ease-in-out",
            },
          }}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
};

export { RegisterPage };
