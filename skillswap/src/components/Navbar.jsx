import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase"; // Firebase config
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth State Changed:", currentUser);
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#ffffff",
          color: "#333",
          boxShadow: "none",
          //borderBottom: "1px solid #ddd",
          padding: "8px 16px",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { sm: "none" } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ flexGrow: 1, cursor: "pointer", color: "#000" }}
            onClick={() => navigate("/")}
          >
            SkillSwap
          </Typography>

          {user ? (
            <>
              <Button sx={navButtonStyle} onClick={() => navigate("/")}>Home</Button>
              <Button sx={navButtonStyle} onClick={() => navigate("/matchmaking")}>Matchmaking</Button>
              <Button sx={navButtonStyle} onClick={() => navigate("/blog")}>Blog</Button>
              <Button
                sx={{
                  backgroundColor: "#f7e154",
                  color: "#111111", // Ensure readable text
                  "&:hover": {
                    backgroundColor: "#e0c217", // Slightly darker yellow for hover effect
                  },
                }}
                onClick={() => navigate("/match-requests")}
              >
                Match Requests
              </Button>


              <IconButton color="inherit" onClick={handleMenuOpen}>
                <AccountCircleIcon sx={{ fontSize: 26, color: "#000" }} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                sx={{
                  "& .MuiPaper-root": {
                    backgroundColor: "#ffffff",
                    color: "#333",
                    border: "1px solid #ddd",
                  },
                }}
              >
                <MenuItem onClick={() => navigate("/dashboard")}>Dashboard</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button sx={navButtonStyle} onClick={() => navigate("/")}>Home</Button>
              <Button sx={navButtonStyle} onClick={() => navigate("/login")}>Sign In</Button>
              <Button variant="outlined" sx={outlinedButtonStyle} onClick={() => navigate("/signup")}>
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#ffffff",
            color: "#333",
            borderRight: "1px solid #ddd",
          },
        }}
      >
        <List sx={{ width: 250 }}>
          {user ? (
            <>
              <ListItem button onClick={() => navigate("/")}>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button onClick={() => navigate("/blog")}>
                <ListItemText primary="Blog" />
              </ListItem>
              <ListItem button onClick={() => navigate("/dashboard")}>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem button onClick={() => navigate("/")}>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button onClick={() => navigate("/login")}>
                <ListItemText primary="Sign In" />
              </ListItem>
              <ListItem button onClick={() => navigate("/signup")}>
                <ListItemText primary="Sign Up" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </>
  );
};

// **Button Styles**
const navButtonStyle = {
  fontSize: "1rem",
  fontWeight: "500",
  color: "#333",
  textTransform: "none",
  px: 2,
  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.05)" },
};

const primaryButtonStyle = {
  backgroundColor: "#4dabf7",
  color: "#fff",
  textTransform: "none",
  "&:hover": { backgroundColor: "#1e88e5" },
};

const outlinedButtonStyle = {
  color: "#333",
  borderColor: "#333",
  fontSize: "1rem",
  fontWeight: "500",
  textTransform: "none",
  px: 2,
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderColor: "#333",
  },
};

export default Navbar;
