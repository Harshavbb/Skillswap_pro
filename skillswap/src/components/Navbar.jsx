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
  Button,
  Container,
  Avatar,
  Tooltip
} from "@mui/material";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  // Helper to determine active link styling
  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { label: "Find Matches", path: "/matchmaking" },
    { label: "Blog", path: "/blog" },
    { label: "Requests", path: "/match-requests", protected: true },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(8px)", // Modern frosted glass effect
          color: "#18181b", // Zinc-950 (Professional Slate)
          borderBottom: "1px solid #e4e4e7", // Subtle divider
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
            
            {/* Logo Section */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                color="inherit"
                aria-label="menu"
                sx={{ display: { sm: "none" }, ml: -1 }}
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                onClick={() => navigate("/")}
                sx={{
                  fontWeight: 800,
                  cursor: "pointer",
                  letterSpacing: "-0.5px",
                  color: "#18181b",
                }}
              >
                Skill<span style={{ color: "#2563eb" }}>Swap</span>
              </Typography>
            </Box>

            {/* Desktop Navigation - Text Links are more professional than Icons */}
            <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", gap: 1 }}>
              {navLinks.map((link) => (
                (!link.protected || user) && (
                  <Button
                    key={link.path}
                    onClick={() => navigate(link.path)}
                    sx={{
                      textTransform: "none",
                      fontSize: "0.9rem",
                      fontWeight: isActive(link.path) ? 700 : 500,
                      color: isActive(link.path) ? "#2563eb" : "#52525b",
                      px: 2,
                      "&:hover": { backgroundColor: "transparent", color: "#18181b" },
                    }}
                  >
                    {link.label}
                  </Button>
                )
              ))}

              <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 24, my: "auto" }} />

              {user ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: 1 }}>
                  <Tooltip title="Dashboard">
                    <Avatar
                      onClick={() => navigate("/dashboard")}
                      src={user.photoURL || ""}
                      sx={{ 
                        width: 34, 
                        height: 34, 
                        cursor: "pointer", 
                        border: isActive("/dashboard") ? "2px solid #2563eb" : "1px solid #e4e4e7" 
                      }}
                    />
                  </Tooltip>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleLogout}
                    sx={{
                      textTransform: "none",
                      borderColor: "#e4e4e7",
                      color: "#71717a",
                      "&:hover": { borderColor: "#ef4444", color: "#ef4444", backgroundColor: "#fef2f2" }
                    }}
                  >
                    Logout
                  </Button>
                </Box>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => navigate("/login")}
                  sx={{
                    textTransform: "none",
                    backgroundColor: "#18181b",
                    borderRadius: "6px",
                    px: 3,
                    boxShadow: "none",
                    "&:hover": { backgroundColor: "#3f3f46", boxShadow: "none" }
                  }}
                >
                  Sign In
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        PaperProps={{ sx: { width: 280, p: 2 } }}
      >
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, px: 2 }}>
          Skill<span style={{ color: "#2563eb" }}>Swap</span>
        </Typography>
        <List>
          {navLinks.map((link) => (
            (!link.protected || user) && (
              <ListItem 
                button 
                key={link.path} 
                onClick={() => { navigate(link.path); handleDrawerToggle(); }}
                sx={{ borderRadius: "8px", mb: 0.5, backgroundColor: isActive(link.path) ? "#f0f7ff" : "transparent" }}
              >
                <ListItemText 
                  primary={link.label} 
                  primaryTypographyProps={{ 
                    fontSize: "0.95rem", 
                    fontWeight: isActive(link.path) ? 700 : 500,
                    color: isActive(link.path) ? "#2563eb" : "#18181b"
                  }} 
                />
              </ListItem>
            )
          ))}
          <Divider sx={{ my: 2 }} />
          <ListItem 
            button 
            onClick={() => { navigate(user ? "/dashboard" : "/login"); handleDrawerToggle(); }}
          >
            <ListItemText 
              primary={user ? "Account Dashboard" : "Sign In"} 
              primaryTypographyProps={{ fontSize: "0.95rem", fontWeight: 500 }}
            />
          </ListItem>
          {user && (
            <ListItem button onClick={handleLogout}>
              <ListItemText 
                primary="Sign Out" 
                primaryTypographyProps={{ fontSize: "0.95rem", fontWeight: 500, color: "#ef4444" }} 
              />
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;