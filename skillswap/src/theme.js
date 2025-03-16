import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#4ab7e0" }, // Blue
    secondary: { main: "#e2d64b" }, // Yellow
    background: { default: "#ffffff" }, // Light background
    text: { primary: "#0d173b" }, // Dark text
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

export default theme;
