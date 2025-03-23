import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import ArticleIcon from "@mui/icons-material/Article";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      {/* AppBar */}
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#ffffff", // Flat white background
          color: "#443627", // Dark brown text/icons
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
          {/* Mobile Menu Icon */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { sm: "none" } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                color: "#443627", // Dark brown for contrast
              }}
            >
              SkillSwap
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 3 }}>
            <IconButton
              color="inherit"
              onClick={() => navigate("/")}
              sx={{
                "&:hover": { backgroundColor: "rgba(68, 54, 39, 0.1)" }, // Subtle hover effect
              }}
            >
              <HomeIcon />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => navigate("/matchmaking")}
              sx={{
                "&:hover": { backgroundColor: "rgba(68, 54, 39, 0.1)" },
              }}
            >
              <PeopleIcon />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => navigate("/blog")}
              sx={{
                "&:hover": { backgroundColor: "rgba(68, 54, 39, 0.1)" },
              }}
            >
              <ArticleIcon />
            </IconButton>
            {user && (
              <IconButton
                color="inherit"
                onClick={() => navigate("/match-requests")}
                sx={{
                  "&:hover": { backgroundColor: "rgba(68, 54, 39, 0.1)" },
                }}
              >
                <MailIcon />
              </IconButton>
            )}
            <IconButton
              color="inherit"
              onClick={() => navigate("/dashboard")}
              sx={{
                "&:hover": { backgroundColor: "rgba(68, 54, 39, 0.1)" },
              }}
            >
              <AccountCircleIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#ffffff", // Flat white background
            color: "#443627", // Dark brown text/icons
            width: 250,
          },
        }}
      >
        <List>
          <ListItem button onClick={() => navigate("/")}>
            <HomeIcon sx={{ marginRight: 1 }} />
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => navigate("/matchmaking")}>
            <PeopleIcon sx={{ marginRight: 1 }} />
            <ListItemText primary="Matchmaking" />
          </ListItem>
          <ListItem button onClick={() => navigate("/blog")}>
            <ArticleIcon sx={{ marginRight: 1 }} />
            <ListItemText primary="Blog" />
          </ListItem>
          {user && (
            <ListItem button onClick={() => navigate("/match-requests")}>
              <MailIcon sx={{ marginRight: 1 }} />
              <ListItemText primary="Match Requests" />
            </ListItem>
          )}
          <Divider />
          {user ? (
            <ListItem button onClick={handleLogout}>
              <AccountCircleIcon sx={{ marginRight: 1 }} />
              <ListItemText primary="Logout" />
            </ListItem>
          ) : (
            <ListItem button onClick={() => navigate("/login")}>
              <AccountCircleIcon sx={{ marginRight: 1 }} />
              <ListItemText primary="Sign In" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;