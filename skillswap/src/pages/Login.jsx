import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Box, Button, Card, Container, TextField, Typography, Stack, Grid } from "@mui/material";
import { Fade } from "@mui/material";
import LoginIllustration from "../assets/login.jpg"; // Replace with your own image

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid email or password.");
    }
  };

  return (
    <Fade in timeout={800}>
      <Container maxWidth="md">
        <Card sx={{ display: "flex", overflow: "hidden", borderRadius: 3, boxShadow: 5 }}>
          {/* Left Side - Illustration */}
          <Grid container>
            <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", justifyContent: "center", bgcolor: "#4ab7e0" }}>
              <img src={LoginIllustration} alt="Login" style={{ width: "80%" }} />
            </Grid>

            {/* Right Side - Form */}
            <Grid item xs={12} md={6} sx={{ p: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                Welcome Back!
              </Typography>
              <Stack spacing={2} component="form" onSubmit={handleSubmit} width="100%">
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button type="submit" variant="contained" color="secondary" sx={{ py: 1.5 }}>
                  Sign In
                </Button>
              </Stack>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Don't have an account?{" "}
                <Link to="/signup" style={{ color: "#4ab7e0", textDecoration: "none" }}>Sign Up</Link>
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Fade>
  );
};

export default Login;
