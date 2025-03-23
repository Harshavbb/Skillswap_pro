// theme.js - Updated with new color palette
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", // Light mode for a clean aesthetic
    primary: {
      main: "#71C9CE", // Teal for primary actions
      contrastText: "#ffffff", // White text for contrast
    },
    secondary: {
      main: "#A6E3E9", // Light teal for secondary actions
      contrastText: "#ffffff",
    },
    background: {
      default: "#E3FDFD", // Soft aqua for the background
      paper: "#CBF1F5", // Light aqua for cards and surfaces
    },
    text: {
      primary: "#71C9CE", // Teal for readability
      secondary: "#A6E3E9", // Light teal for secondary text
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif", // Modern and clean font
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: "#71C9CE", // Primary color for headings
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#71C9CE",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
      color: "#71C9CE",
    },
    body1: {
      fontSize: "1rem",
      color: "#71C9CE",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      color: "#A6E3E9",
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
          borderRadius: 8, // Rounded corners for buttons
          padding: "10px 24px",
          fontSize: "1rem",
          fontWeight: 600,
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)", // Subtle hover effect
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Hover shadow
          },
        },
        containedPrimary: {
          backgroundColor: "#71C9CE",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#5BB3B8", // Slightly darker teal on hover
          },
        },
        containedSecondary: {
          backgroundColor: "#A6E3E9",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#8FD1D7", // Slightly darker light teal on hover
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12, // Softer corners for cards
          padding: 24,
          backgroundColor: "#CBF1F5",
          boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#71C9CE", // Flat teal background for AppBar
          color: "#ffffff",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#71C9CE", // Default text color
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8, // Rounded input fields
            "& fieldset": {
              borderColor: "#A6E3E9", // Light teal border
            },
            "&:hover fieldset": {
              borderColor: "#71C9CE", // Teal on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "#A6E3E9", // Light teal when focused
            },
          },
        },
      },
    },
  },
});

export default theme;