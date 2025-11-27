import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { authLevels, colorPalette } from "../utils/consts";
import { paths } from "../routes/paths";

const NavBar: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

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

        {paths
          .filter(
            (path) => authLevels[path.role] >= authLevels[user?.role || "user"]
          )
          .map((path) => (
            <Button
              color="inherit"
              component={RouterLink}
              to={path.to}
              key={path.to}
              style={{
                textDecoration: path.to === pathname ? "underline" : "inherit",
              }}
            >
              {path.name}
            </Button>
          ))}

        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export { NavBar };
