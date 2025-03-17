import React from "react";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import landingImage from "../assets/ImageGen_Mar_17__2025__09_37_07_AM-removebg-preview.png"; // Adjust path based on your project structure

const LandingPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#000000", // Pitch black background
        color: "#ffffff", // White text for contrast
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 24px",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Left Side (Text Section) */}
          <Grid item xs={12} md={6}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Swap Skills, <br /> Learn and Grow
            </Typography>
            <Typography variant="body1" sx={{ color: "#b3b3b3", mt: 2 }}>
              Connect with skilled individuals to exchange knowledge and grow together.
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: "#4ab7e0", // Accent color
                color: "#ffffff",
                padding: "12px 24px",
                fontSize: "1rem",
                textTransform: "none",
                "&:hover": { backgroundColor: "#3a94c3" }, // Slightly darker hover effect
              }}
            >
              Get Started
            </Button>
          </Grid>

          {/* Right Side (Illustration Image) */}
          <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
            <Box
              component="img"
              src={landingImage}
              alt="Landing Page Illustration"
              sx={{
                width: "100%",
                maxWidth: 400,
                height: "auto",
                borderRadius: 2,
                border: "1px solid #000", // Subtle border
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage;
