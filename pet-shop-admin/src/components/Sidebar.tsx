import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  People,
  ShoppingCart,
  Menu,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const theme = useTheme();

  const navItems = [
    { path: "/", label: "Dashboard", icon: <DashboardIcon /> },
    { path: "/users", label: "Users", icon: <People /> },
    { path: "/products", label: "Products", icon: <ShoppingCart /> },
    { path: "/categories", label: "Categories", icon: <Menu /> },
    // { path: "/transactions", label: "Transactions", icon: <Receipt /> },
    // { path: "/logout", label: "Logout", icon: <ExitToApp /> },
  ];

  return (
    <Box
      sx={{
        width: 280,
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[3],
        display: "flex",
        flexDirection: "column",
        zIndex: 100,
      }}
    >
      <Box
        sx={{
          padding: theme.spacing(3),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="h6" component="h1" sx={{ fontWeight: 700 }}>
          ADMIN PANEL
        </Typography>
      </Box>

      <Box sx={{ padding: theme.spacing(2), flexGrow: 1 }}>
        {navItems.map((item) => (
          <Link
            to={item.path}
            key={item.path}
            style={{ textDecoration: "none" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                padding: theme.spacing(1.5, 2),
                marginBottom: theme.spacing(1),
                borderRadius: theme.shape.borderRadius,
                backgroundColor:
                  location.pathname === item.path
                    ? theme.palette.action.selected
                    : "transparent",
                color:
                  location.pathname === item.path
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
                transition: "all 0.3s ease",
              }}
            >
              <Box sx={{ marginRight: theme.spacing(2) }}>
                {React.cloneElement(item.icon, {
                  color: location.pathname === item.path ? "primary" : "action",
                })}
              </Box>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: location.pathname === item.path ? "600" : "400",
                }}
              >
                {item.label}
              </Typography>
            </Box>
          </Link>
        ))}
      </Box>

      <Box
        sx={{
          padding: theme.spacing(2),
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          v1.0.0
        </Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;
