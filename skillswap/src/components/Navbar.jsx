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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase"; // Make sure this is correctly imported
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth State Changed:", currentUser);
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
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
          backgroundColor: "#000000",
          color: "#ffffff",
          boxShadow: "none",
          borderBottom: "1px solid #333",
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
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            SkillSwap
          </Typography>

          {user ? (
            <>
              <Button color="inherit" sx={navButtonStyle} onClick={() => navigate("/")}>
                Home
              </Button>
              <Button color="inherit" sx={navButtonStyle} onClick={() => navigate("/matchmaking")}>
                Matchmaking
              </Button>
              <Button color="inherit" sx={navButtonStyle} onClick={() => navigate("/blog")}>
                Blog
              </Button>

              <IconButton color="inherit" onClick={handleMenuOpen}>
                <AccountCircleIcon sx={{ fontSize: 26 }} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                sx={{
                  "& .MuiPaper-root": {
                    backgroundColor: "#1c1c1c",
                    color: "#ffffff",
                  },
                }}
              >
                <MenuItem onClick={() => navigate("/dashboard")}>Dashboard</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" sx={navButtonStyle} onClick={() => navigate("/")}>
                Home
              </Button>
              <Button color="inherit" sx={navButtonStyle} onClick={() => navigate("/login")}>
                Sign In
              </Button>
              <Button
                variant="outlined"
                sx={{
                  color: "#ffffff",
                  borderColor: "#ffffff",
                  fontSize: "0.95rem",
                  fontWeight: "500",
                  textTransform: "none",
                  px: 2,
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderColor: "#ffffff",
                  },
                }}
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#1c1c1c",
            color: "#ffffff",
          },
        }}
      >
        <List sx={{ width: 250 }}>
          {user ? (
            <>
              <ListItem button onClick={() => navigate("/")}>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button onClick={() => navigate("/matchmaking")}>
                <ListItemText primary="Matchmaking" />
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

// Button Style
const navButtonStyle = {
  fontSize: "0.95rem",
  fontWeight: "500",
  textTransform: "none",
  px: 2,
  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
};

export default Navbar;
