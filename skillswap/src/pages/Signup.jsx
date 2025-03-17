import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Container, TextField, Button, Typography, Card } from "@mui/material";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(username, email, password);
      navigate("/dashboard");
    } catch (error) {
      alert("Signup failed!");
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
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
          Create your SkillSwap account
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            fullWidth
            variant="outlined"
            InputLabelProps={{ style: { color: "#8b949e" } }}
            InputProps={{ style: { background: "#161b22", color: "#ffffff" } }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            InputLabelProps={{ style: { color: "#8b949e" } }}
            InputProps={{ style: { background: "#161b22", color: "#ffffff" } }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            InputLabelProps={{ style: { color: "#8b949e" } }}
            InputProps={{ style: { background: "#161b22", color: "#ffffff" } }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              bgcolor: "#238636",
              "&:hover": { bgcolor: "#2ea043" },
              py: 1.5,
            }}
          >
            Sign Up
          </Button>

          <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#58a6ff", textDecoration: "none" }}>
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>
    </Container>
  );
};

export default Signup;
