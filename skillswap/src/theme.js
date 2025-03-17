import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0d173b", // Dark Blue
    },
    secondary: {
      main: "#4ab7e0", // Light Blue
    },
    background: {
      default: "#f5f5f5", // Light Gray
      paper: "#ffffff", // Card & Modal backgrounds
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h4: {
      fontWeight: "bold",
      color: "#0d173b",
      letterSpacing: "0.5px",
    },
    body2: {
      color: "#666",
      lineHeight: 1.6,
    },
    button: {
      textTransform: "none",
      fontWeight: "bold",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.12)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 20px",
          fontWeight: "bold",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            backgroundColor: "#2d6668",
            color: "#fff",
          },
          "&:active": {
            transform: "scale(0.98)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label": {
            color: "#0d173b",
            fontWeight: "500",
          },
          "& label.Mui-focused": {
            color: "#4ab7e0",
          },
          "& .MuiOutlinedInput-root": {
            transition: "all 0.2s ease-in-out",
            "& fieldset": {
              borderColor: "#4ab7e0",
              borderRadius: 8,
            },
            "&:hover fieldset": {
              borderColor: "#2d6668",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#2d6668",
              boxShadow: "0px 0px 8px rgba(45, 102, 104, 0.2)",
            },
          },
        },
      },
    },
  },
});

export default theme;
