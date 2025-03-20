// theme.js - Redesigned for Notion-like minimal UI
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", // Light mode for a clean aesthetic
    primary: {
      main: "#111111", // Bold black for text and accents
    },
    secondary: {
      main: "#6adb64", // Vibrant green for highlights
    },
    background: {
      default: "#ffffff", // Clean white background
      paper: "#f7f7f7", // Light gray for subtle contrast
    },
    text: {
      primary: "#111111", // Deep black for strong readability
      secondary: "#555555", // Softer gray for muted text
    },
  },
  typography: {
    fontFamily: "'poppins', sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: "#111111",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#111111",
    },
    body1: {
      fontSize: "1rem",
      color: "#555555",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 20px",
          fontSize: "1rem",
          fontWeight: 600,
          color: "#111111",
          backgroundColor: "#ffffff",
          transition: "all 0.3s",
          '&:hover': {
            backgroundColor: "#222222",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: 20,
          backgroundColor: "#ffffff",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
        },
      },
    },
  },
});

export default theme;
