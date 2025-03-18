import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#58a6ff", // GitHub's blue accent
    },
    secondary: {
      main: "#8b949e", // Muted gray text color
    },
    background: {
      default: "#0d1117", // GitHub's pitch-black background
      paper: "#161b22", // Darker card & modal background
    },
    text: {
      primary: "#c9d1d9", // White text
      secondary: "#8b949e", // Muted gray
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h4: {
      fontWeight: 600,
      color: "#c9d1d9",
    },
    body2: {
      color: "#8b949e",
      lineHeight: 1.6,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: "#161b22",
          border: "1px solid #30363d",
          boxShadow: "none",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            borderColor: "#58a6ff",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 600,
          color: "#c9d1d9",
          //backgroundColor: "#21262d",
          //border: "1px solid #30363d",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            backgroundColor: "#30363d",
            borderColor: "#58a6ff",
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
            color: "#8b949e",
          },
          "& label.Mui-focused": {
            color: "#58a6ff",
          },
          "& .MuiOutlinedInput-root": {
            color: "#c9d1d9",
            backgroundColor: "#0d1117",
            borderRadius: 6,
            "& fieldset": {
              borderColor: "#30363d",
            },
            "&:hover fieldset": {
              borderColor: "#58a6ff",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#58a6ff",
              boxShadow: "0px 0px 8px rgba(88, 166, 255, 0.2)",
            },
          },
        },
      },
    },
  },
});

export default theme;
  