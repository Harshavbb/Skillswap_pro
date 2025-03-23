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
import loginImage from "../assets/login_illustration.png"; // Add a relevant image

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
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        padding: 3,
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          boxShadow: 6,
          borderRadius: 5,
          overflow: "hidden",
          padding: 4,
          bgcolor: "#ffffff",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            marginBottom: 3,
          }}
        >
          <img
            src={loginImage}
            alt="Login Illustration"
            style={{ width: "150px", marginBottom: "16px" }}
          />
          <Typography variant="h5" fontWeight="bold" mb={1}>
            Welcome Back!
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Sign in to continue your journey with SkillSwap.
          </Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ mb: 2, borderRadius: 2 }}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ mb: 3, borderRadius: 2 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              py: 1.5,
              fontWeight: "bold",
              background: "linear-gradient(90deg, #ff8a00, #e52e71)",
              color: "white",
              borderRadius: 3,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              "&:hover": {
                background: "linear-gradient(90deg, #e52e71, #ff8a00)",
              },
            }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Sign In"}
          </Button>

          <Typography variant="body2" textAlign="center" sx={{ mt: 3 }}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "#e52e71", textDecoration: "none", fontWeight: "bold" }}>
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>
    </Container>
  );
};

export default Login;