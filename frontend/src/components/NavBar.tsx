import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { colorPalette } from "../utils/consts";

const NavBar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      sx={{ bgcolor: colorPalette.brown, marginBottom: 2, color: "black" }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Shop
        </Typography>

        <Button color="inherit" component={RouterLink} to="/products">
          Products
        </Button>
        <Button color="inherit" component={RouterLink} to="/cart">
          Cart
        </Button>

        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export { NavBar };
