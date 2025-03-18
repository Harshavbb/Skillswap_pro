import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CircularProgress,
  Alert,
} from "@mui/material";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      setMessage("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      setLoading(false);
      if (err.code === "auth/user-not-found") {
        setError("User not found. Please check your email.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password. Try again.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          width: "100%",
          p: 4,
          bgcolor: "#0d1117",
          color: "#ffffff",
          border: "1px solid #30363d",
          boxShadow: "none",
        }}
      >
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
          Sign in to SkillSwap
        </Typography>

        <Typography
          variant="body2"
          textAlign="center"
          sx={{ color: "#8b949e", mb: 3 }}
        >
          Exchange skills, grow together.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2, bgcolor: "#ff7b72", color: "#0d1117" }}>
            {error}
          </Alert>
        )}

        {message && (
          <Alert severity="success" sx={{ mb: 2, bgcolor: "#238636", color: "#ffffff" }}>
            {message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            InputLabelProps={{ style: { color: "#8b949e" } }}
            InputProps={{
              style: { background: "#161b22", color: "#ffffff" },
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#30363d" },
                "&:hover fieldset": { borderColor: "#58a6ff" },
                "&.Mui-focused fieldset": { borderColor: "#58a6ff" },
              },
            }}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            InputLabelProps={{ style: { color: "#8b949e" } }}
            InputProps={{
              style: { background: "#161b22", color: "#ffffff" },
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#30363d" },
                "&:hover fieldset": { borderColor: "#58a6ff" },
                "&.Mui-focused fieldset": { borderColor: "#58a6ff" },
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              bgcolor: "#238636",
              py: 1.5,
              fontWeight: "bold",
              "&:hover": { bgcolor: "#2ea043" },
              "&:active": { transform: "scale(0.98)" },
            }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Sign In"}
          </Button>

          <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "#58a6ff", textDecoration: "none" }}>
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>
    </Container>
  );
};

export default Login;
